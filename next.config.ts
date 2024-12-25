import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/h/:id*",
        destination: "/api/:id*",
      },
    ];
  },
};

export default nextConfig;
