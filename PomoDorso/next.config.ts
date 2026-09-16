import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` produces a self-contained ./out directory
  // that can be hosted anywhere (Vercel, Netlify, S3, plain nginx...).
  output: "export",
};

export default nextConfig;
