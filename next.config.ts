import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Vercel 배포시 content 폴더 포함
  outputFileTracingIncludes: {
    '/*': ['./src/content/**/*'],
  },
};

export default nextConfig;
