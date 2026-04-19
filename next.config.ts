import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
};

export default nextConfig;
