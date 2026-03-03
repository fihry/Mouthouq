import type { NextConfig } from "next";

const backendURL = process.env.NEXT_BACKEND_URL || "http://localhost:8080";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucarecdn.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendURL}/api/v1/:path*`,
      }
    ];
  },
};

export default nextConfig;
