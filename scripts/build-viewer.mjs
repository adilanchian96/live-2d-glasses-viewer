import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/glasses-standalone/viewer.ts"],
  outfile: "public/glasses-viewer.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: ["es2020"],
  minify: true,
  logLevel: "info",
});

console.log("Built public/glasses-viewer.js");
