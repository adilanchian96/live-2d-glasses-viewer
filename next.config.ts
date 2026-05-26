import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pixi.js", "untitled-pixi-live2d-engine"],
  turbopack: {
    root: import.meta.dirname,
  },
  async rewrites() {
    return {
      // Static HTML viewer — no React hydration on glasses route
      beforeFiles: [{ source: "/view", destination: "/view.html" }],
    };
  },
};

export default nextConfig;
