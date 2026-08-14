import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
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
