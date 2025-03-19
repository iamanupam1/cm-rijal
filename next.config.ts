import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compilerOptions: {
    strict: true,
    skipLibCheck: true,
    moduleResolution: "node",
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
