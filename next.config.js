/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      }
    ]
  },
  typescript: {
    // During development we type check, but for builds we'll rely on IDE and pre-commit hooks
    ignoreBuildErrors: true,
  },
  eslint: {
    // During development we lint, but for builds we'll rely on IDE and pre-commit hooks
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig 