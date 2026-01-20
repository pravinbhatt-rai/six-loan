import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/creditcards/:path*.png',
        destination: '/creditcard/:path*.png',
      },
      {
        source: '/creditcards/:path*.jpg',
        destination: '/creditcard/:path*.jpg',
      },
      {
        source: '/creditcards/:path*.jpeg',
        destination: '/creditcard/:path*.jpeg',
      },
      {
        source: '/creditcards/:path*.svg',
        destination: '/creditcard/:path*.svg',
      },
      {
        source: '/creditcards/:path*.webp',
        destination: '/creditcard/:path*.webp',
      },
    ];
  },
};

export default nextConfig;
