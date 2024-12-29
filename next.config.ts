import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
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
