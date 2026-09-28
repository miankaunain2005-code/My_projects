const { ensureRegistry, activateRelease, deactivateRelease } = require("./releases");
const [command, id] = process.argv.slice(2);
if (command === "list") console.table(ensureRegistry().releases.map(({ id, runtimeVersion, channel, status, message, directory, gitCommit }) => ({ id, runtimeVersion, channel, status, message, directory, gitCommit })));
else if (command === "activate" && id) console.log(activateRelease(id));
else if (command === "deactivate" && id) console.log(deactivateRelease(id));
else console.log("Usage: node ota.js list | activate <release-id> | deactivate <release-id>");
