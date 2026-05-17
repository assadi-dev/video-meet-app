import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  turbopack: {
    resolveExtensions: [
      ".css",
      ".mdx",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".mjs",
      ".json",
      ".mp4",
      ".webm",
      ".ogg",
      ".mp3",
      ".wave",
      ".aac",
      ".rtf",
      ".doc",
      ".docx",
    ],
  },
};

export default nextConfig;
