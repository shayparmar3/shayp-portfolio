import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // replaces `next export`
  images: {
    unoptimized: true, // needed since Image Optimization doesn't work with static export
  },
};

export default nextConfig;
