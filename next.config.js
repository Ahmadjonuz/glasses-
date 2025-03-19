/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Handle build errors gracefully
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optimize font loading
  optimizeFonts: true,
  // Handle MongoDB during build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        mongodb: false,
      }
    }
    return config
  },
  // Configure static generation
  output: 'standalone',
  // Disable static page generation optimization
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig 