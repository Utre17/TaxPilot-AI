/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 13+ when using the app directory
  // No need for experimental.appDir in Next.js 15
  typescript: {
    // During production builds, TypeScript errors won't fail the build
    // but we'll handle them during development with strict type checking
    ignoreBuildErrors: false,
  },
  eslint: {
    // ESLint errors won't fail the build during production
    ignoreDuringBuilds: false,
  },
  // Ensure proper CSS and font loading
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Reduce console noise in development
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  // Add headers for better security and reduce CSP warnings
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig 