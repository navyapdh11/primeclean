/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: true,
    ppr: true,
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },
  output: 'standalone',
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] }
};

module.exports = nextConfig;
