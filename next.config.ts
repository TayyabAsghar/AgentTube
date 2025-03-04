import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.ytimg.com",
        protocol: "https",
      },
      {
        hostname: "yt3.ggpht.com",
        protocol: "https",
      },
      {
        hostname: "groovy-llama-323.convex.cloud",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
