import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['three'],
  images: {
    unoptimized: true,
  }
};



export default nextConfig;
