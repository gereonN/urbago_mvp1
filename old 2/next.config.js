/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removing 'output: export' to enable server-side features for Vercel deployment
  images: {
    domains: ['localhost', 'vercel.app'],
    // Only use unoptimized for local development or static exports
    unoptimized: process.env.NODE_ENV === 'development'
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
