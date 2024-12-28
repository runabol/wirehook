import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
