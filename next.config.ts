import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.youthdaily.co.kr',
      },
      {
        protocol: 'https',
        hostname: 'cdn.youthdaily.co.kr',
      },
      {
        protocol: 'https',
        hostname: 'www.eroun.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.eroun.net',
      },
      {
        protocol: 'https',
        hostname: '*.allforyoung.com',
      },
      {
        protocol: 'https',
        hostname: 'allforyoung-homepage-maycan.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'imgnews.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'opcl.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'eventusstorage.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.socialimpactnews.net',
      },
    ],
  },
  // Vercel 배포시 content 폴더 포함
  outputFileTracingIncludes: {
    '/*': ['./src/content/**/*'],
  },
};

export default nextConfig;
