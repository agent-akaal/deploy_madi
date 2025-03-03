import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['three'],
  distDir: 'dist',
  images: {
    unoptimized: true,
  }
};



export default nextConfig;
