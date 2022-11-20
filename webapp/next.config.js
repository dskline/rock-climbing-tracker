/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["plus.unsplash.com"],
  }
}

module.exports = nextConfig
