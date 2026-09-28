const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const mime = require("mime-types");
const { UPDATES_DIR, ensureRegistry, getActiveRelease, activateRelease, deactivateRelease } = require("./releases");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.OTA_ADMIN_TOKEN;
app.set("trust proxy", true);
app.use(express.json());

function adminOnly(req, res, next) {
  if (!ADMIN_TOKEN || req.get("x-ota-admin-token") === ADMIN_TOKEN) return next();
  return res.status(401).json({ error: "Admin token required" });
}
function toUrlPath(relativePath) { return relativePath.split(path.sep).join("/"); }
function multipartManifest(res, manifest) {
  const boundary = crypto.randomBytes(16).toString("hex");
  const body = `--${boundary}\r\nContent-Type: application/json; charset=utf-8\r\nContent-Disposition: form-data; name="manifest"\r\n\r\n${JSON.stringify(manifest)}\r\n--${boundary}--`;
  res.setHeader("content-type", `multipart/mixed; boundary=${boundary}`);
  res.end(body);
}

app.get("/api/manifest", (req, res) => {
  try {
    const platform = req.get("expo-platform") || req.query.platform;
    const runtimeVersion = req.get("expo-runtime-version") || req.query["runtime-version"];
    const channel = req.get("expo-channel-name") || "production";
    if (!["ios", "android"].includes(platform)) return res.status(400).json({ error: "expo-platform must be ios or android" });
    if (!runtimeVersion) return res.status(400).json({ error: "Missing expo-runtime-version" });
    // Existing self-hosted builds may send no channel, or a channel name that
    // was never configured on this server. Falling back to production keeps
    // the current update flow working exactly as before.
    const release = getActiveRelease(runtimeVersion, channel) || (channel !== "production" ? getActiveRelease(runtimeVersion, "production") : null);
    if (!release) return res.status(204).end();
    const updatePath = path.join(UPDATES_DIR, runtimeVersion, release.directory);
    const metadata = JSON.parse(fs.readFileSync(path.join(updatePath, "metadata.json"), "utf8"));
    const platformMetadata = metadata.fileMetadata[platform];
    if (!platformMetadata) return res.status(404).json({ error: `No ${platform} build in selected release` });
    const baseUrl = `https://${req.get("host")}`;
    const asset = (file) => {
      const filePath = path.join(updatePath, file);
      return { key: crypto.createHash("md5").update(file).digest("hex"), contentType: mime.lookup(filePath) || "application/octet-stream", url: `${baseUrl}/api/assets?asset=${encodeURIComponent(toUrlPath(path.relative(UPDATES_DIR, filePath)))}` };
    };
    const manifest = { id: release.manifestId, createdAt: release.publishedAt, runtimeVersion, launchAsset: asset(platformMetadata.bundle), assets: platformMetadata.assets.map((item) => asset(item.path)), metadata: {}, extra: { releaseId: release.id, message: release.message } };
    res.set({ "expo-protocol-version": "1", "expo-sfv-version": "0", "cache-control": "private, max-age=0" });
    return multipartManifest(res, manifest);
  } catch (error) { console.error(error); return res.status(500).json({ error: "Internal server error" }); }
});

app.get("/api/assets", (req, res) => {
  const relative = req.query.asset;
  if (!relative) return res.status(400).send("Missing asset");
  const target = path.resolve(UPDATES_DIR, relative);
  if (!target.startsWith(`${path.resolve(UPDATES_DIR)}${path.sep}`) || !fs.existsSync(target)) return res.status(404).send("Asset not found");
  res.set({ "content-type": mime.lookup(target) || "application/octet-stream", "cache-control": "public, max-age=31536000, immutable" });
  return res.sendFile(target);
});

app.get("/api/admin/releases", adminOnly, (req, res) => res.json(ensureRegistry()));
app.post("/api/admin/releases/:id/activate", adminOnly, (req, res) => { try { res.json(activateRelease(req.params.id)); } catch (error) { res.status(400).json({ error: error.message }); } });
app.post("/api/admin/releases/:id/deactivate", adminOnly, (req, res) => { try { res.json(deactivateRelease(req.params.id)); } catch (error) { res.status(400).json({ error: error.message }); } });
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/dashboard", express.static(path.join(__dirname, "public")));

ensureRegistry();
app.listen(PORT, () => console.log(`OTA server: http://localhost:${PORT}\nDashboard: http://localhost:${PORT}/dashboard`));
