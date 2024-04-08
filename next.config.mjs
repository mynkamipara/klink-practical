/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    COINGECKO_API_URL: process.env.COINGECKO_API_URL,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT
  },
  images: {
    domains: ['assets.coingecko.com'],
  },
};

export default nextConfig;
