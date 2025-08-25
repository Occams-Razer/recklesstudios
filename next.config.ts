import type { NextConfig } from "next";
import { withNextVideo } from "next-video/process";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mov)$/,
      type: "asset/resource",
      generator: {
        filename: "/videos/[name].[hash][ext]",
      },
    });
    return config;
  },
};

export default withNextVideo(nextConfig);
