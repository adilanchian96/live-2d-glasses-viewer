import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pixi + Live2D Cubism are browser-only; keep them out of the server bundle.
  serverExternalPackages: ["pixi.js", "untitled-pixi-live2d-engine"],
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
