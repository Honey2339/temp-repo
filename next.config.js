/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "cdn.builder.io",
      "books.google.com",
      "picsum.photos",
      "https://picsum.photos/200",
    ],
  },
};

module.exports = nextConfig;
