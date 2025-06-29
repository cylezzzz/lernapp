// next.config.js
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    return config;
  },
  images: {
    domains: ['example.com'],
  },
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
};
