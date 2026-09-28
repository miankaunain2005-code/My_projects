const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const UPDATES_DIR = path.join(__dirname, "updates");
const DATA_DIR = path.join(__dirname, "data");
const REGISTRY_PATH = path.join(DATA_DIR, "releases.json");

function readRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) return { releases: [] };
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
  return { releases: Array.isArray(registry.releases) ? registry.releases : [] };
}

function writeRegistry(registry) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const temporaryPath = `${REGISTRY_PATH}.tmp`;
  fs.writeFileSync(temporaryPath, `${JSON.stringify(registry, null, 2)}\n`);
  fs.renameSync(temporaryPath, REGISTRY_PATH);
}

function scanExistingUpdates(registry) {
  if (!fs.existsSync(UPDATES_DIR)) return false;
  let changed = false;
  for (const runtimeVersion of fs.readdirSync(UPDATES_DIR)) {
    const runtimePath = path.join(UPDATES_DIR, runtimeVersion);
    if (!fs.statSync(runtimePath).isDirectory()) continue;
    const directories = fs.readdirSync(runtimePath)
      .filter((name) => fs.statSync(path.join(runtimePath, name)).isDirectory())
      .sort();
    for (const directory of directories) {
      if (registry.releases.some((release) => release.directory === directory && release.runtimeVersion === runtimeVersion)) continue;
      const folderTime = fs.statSync(path.join(runtimePath, directory)).birthtime.toISOString();
      registry.releases.push({
        id: crypto.randomUUID(),
        manifestId: crypto.randomUUID(),
        runtimeVersion,
        channel: "production",
        directory,
        status: "inactive",
        createdAt: folderTime,
        publishedAt: folderTime,
        message: "Imported existing update",
        gitCommit: null,
        sourceReleaseId: null,
      });
      changed = true;
    }
    const alreadyActive = registry.releases.some((release) =>
  release.runtimeVersion === runtimeVersion &&
  release.channel === "production" &&
  release.status === "active"
);

const active = registry.releases
  .filter((release) => release.runtimeVersion === runtimeVersion && release.channel === "production")
  .sort((a, b) => a.directory.localeCompare(b.directory))
  .at(-1);

// Newest folder sirf pehli dafa active hoga.
// Dashboard se jis update ko activate karoge, woh active hi rahega.
if (!alreadyActive && active) {
      registry.releases.forEach((release) => {
        if (release.runtimeVersion === runtimeVersion && release.channel === "production") release.status = "inactive";
      });
      active.status = "active";
      // This registry is being introduced after OTA updates already existed.
      // Give the selected release a fresh deployment time/id so installed
      // clients reliably see it as the current update after migration.
      active.publishedAt = new Date().toISOString();
      active.manifestId = crypto.randomUUID();
      active.message = active.message === "Imported existing update" ? "Current active update (imported)" : active.message;
      changed = true;
    }
  }
  return changed;
}

function ensureRegistry() {
  const registry = readRegistry();
  if (scanExistingUpdates(registry)) writeRegistry(registry);
  return registry;
}

function addRelease({ runtimeVersion, directory, channel = "production", message, gitCommit }) {
  const registry = ensureRegistry();
  registry.releases.forEach((release) => {
    if (release.runtimeVersion === runtimeVersion && release.channel === channel && release.status === "active") release.status = "inactive";
  });
  const now = new Date().toISOString();
  const release = {
    id: crypto.randomUUID(), manifestId: crypto.randomUUID(), runtimeVersion, directory, channel,
    status: "active", createdAt: now, publishedAt: now,
    message: message || "No message", gitCommit: gitCommit || null, sourceReleaseId: null,
  };
  registry.releases.push(release);
  writeRegistry(registry);
  return release;
}

function getActiveRelease(runtimeVersion, channel = "production") {
  const registry = ensureRegistry();
  return registry.releases.find((release) => release.runtimeVersion === runtimeVersion && release.channel === channel && release.status === "active") || null;
}

function getRelease(id) { return ensureRegistry().releases.find((release) => release.id === id) || null; }

function activateRelease(id) {
  const registry = ensureRegistry();
  const source = registry.releases.find((release) => release.id === id);
  if (!source) throw new Error("Release not found");
  registry.releases.forEach((release) => {
    if (release.runtimeVersion === source.runtimeVersion && release.channel === source.channel && release.status === "active") release.status = "inactive";
  });
  // A fresh record makes the phone treat this rollback as a new OTA deployment.
  const now = new Date().toISOString();
  const release = { ...source, id: crypto.randomUUID(), manifestId: crypto.randomUUID(), status: "active", createdAt: now, publishedAt: now, sourceReleaseId: source.id, message: `Rollback/activate: ${source.message}` };
  registry.releases.push(release);
  writeRegistry(registry);
  return release;
}

function deactivateRelease(id) {
  const registry = ensureRegistry();
  const release = registry.releases.find((item) => item.id === id);
  if (!release) throw new Error("Release not found");
  if (release.status !== "active") throw new Error("Only the active release can be deactivated");
  release.status = "inactive";
  writeRegistry(registry);
  return release;
}

module.exports = { UPDATES_DIR, ensureRegistry, addRelease, getActiveRelease, getRelease, activateRelease, deactivateRelease };
