import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const openclawAssets = join(root, "..", "openclaw-live2d", "assets");
const publicDir = join(root, "public");

if (!existsSync(openclawAssets)) {
  console.error(
    "openclaw-live2d assets not found at:",
    openclawAssets,
    "\nCopy live2dcubismcore.min.js and models/ into public/ manually.",
  );
  process.exit(1);
}

mkdirSync(join(publicDir, "models"), { recursive: true });
cpSync(
  join(openclawAssets, "live2dcubismcore.min.js"),
  join(publicDir, "live2dcubismcore.min.js"),
  { force: true },
);
cpSync(join(openclawAssets, "models"), join(publicDir, "models"), {
  recursive: true,
  force: true,
});

console.log("Copied Live2D assets from openclaw-live2d to public/");
