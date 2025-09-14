const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
  publicExcludes: ['!robots.txt', '!sitemap.xml']
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'ik.imagekit.io'],
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

module.exports = withPWA(nextConfig);