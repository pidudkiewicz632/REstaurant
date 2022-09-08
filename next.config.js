/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    BASE_URL: `http://${process.env.HOST}:${process.env.PORT}`,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig
