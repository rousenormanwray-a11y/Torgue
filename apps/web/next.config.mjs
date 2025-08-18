/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_SOCIAL_URL: process.env.NEXT_PUBLIC_SOCIAL_URL || 'http://localhost:4050'
  }
};

export default nextConfig;

