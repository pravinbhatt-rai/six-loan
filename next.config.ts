import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Performance optimizations
  // SWC minification is enabled by default in Next.js 16
  productionBrowserSourceMaps: false,
  // Optimized images
  images: {
    formats: ['image/avif', 'image/webp'],
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
