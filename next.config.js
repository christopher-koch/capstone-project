/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com'
      // },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/api/:slug", // The :path parameter isn't used here so will be automatically passed in the query
      },
    ];
  },
};

module.exports = nextConfig;
