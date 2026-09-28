const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { addRelease } = require("./releases");

const [appPath, runtimeVersion, ...args] = process.argv.slice(2);
const option = (name, fallback) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : fallback; };
const platform = option("--platform", "all");
const channel = option("--channel", "production");
const message = option("--message", "No message");
if (!appPath || !runtimeVersion) { console.error("Usage: node publish.js <app-path> <runtimeVersion> --message \"what changed\" [--channel production] [--platform all]"); process.exit(1); }
const resolvedAppPath = path.resolve(appPath);
if (!fs.existsSync(resolvedAppPath)) { console.error(`App path not found: ${resolvedAppPath}`); process.exit(1); }
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const destination = path.join(__dirname, "updates", runtimeVersion, timestamp);
try {
  execFileSync("npx", ["expo", "export", ...(platform === "all" ? [] : ["--platform", platform]), "--output-dir", "dist"], { cwd: resolvedAppPath, stdio: "inherit", shell: process.platform === "win32" });
  fs.mkdirSync(destination, { recursive: true });
  fs.cpSync(path.join(resolvedAppPath, "dist"), destination, { recursive: true });
  let gitCommit = null;
  try { gitCommit = execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: resolvedAppPath, encoding: "utf8" }).trim(); } catch (_) {}
  const release = addRelease({ runtimeVersion, directory: timestamp, channel, message, gitCommit });
  console.log(`\nPublished and ACTIVE: ${release.id}\nMessage: ${message}\nDashboard: /dashboard`);
} catch (error) { console.error(error.message); process.exit(1); }
