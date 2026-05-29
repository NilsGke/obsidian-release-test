import { readFileSync, writeFileSync } from "fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const targetVersion = pkg.version;

if (!targetVersion) {
  console.error("No target version detected in package.json");
  process.exit(1);
}

// --------------------
// Update manifest.json
// --------------------
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));

if (!manifest.minAppVersion) {
  console.error("manifest.json is missing minAppVersion");
  process.exit(1);
}

manifest.version = targetVersion;

writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t") + "\n");

// --------------------
// Update versions.json
// --------------------
const versions = JSON.parse(readFileSync("versions.json", "utf8"));

// Always set mapping for this release version
versions[targetVersion] = manifest.minAppVersion;

// Write back deterministically
writeFileSync("versions.json", JSON.stringify(versions, null, "\t") + "\n");
