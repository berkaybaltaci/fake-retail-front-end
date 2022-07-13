/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/products/page/1',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['picsum.photos'],
  },
};

module.exports = nextConfig;
