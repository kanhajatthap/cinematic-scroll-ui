import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cloudways.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/mostar",
        destination: "/mostar/index.html",
      },
    ];
  },
};

export default nextConfig;
