import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Add other image hostnames if needed, e.g., Firebase Storage
      // {
      //    protocol: 'https',
      //    hostname: 'firebasestorage.googleapis.com',
      //    port: '',
      //    pathname: '/**',
      // },
    ],
  },
  experimental: {
    // serverActions: true, // This is true by default in Next.js 14+
  },
};

export default nextConfig;
