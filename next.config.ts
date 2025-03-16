import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        protocol: "https"
      }
    ]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

export default nextConfig;
