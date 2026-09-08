import type { NextConfig } from "next";
import { withNextVideo } from "next-video/process";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "image.mux.com" }],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mov)$/,
      type: "asset/resource",
      generator: {
        filename: "videos/[name][ext]",
      },
    });
    return config;
  },
};

export default withNextVideo(nextConfig);
