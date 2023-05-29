/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.frag/,
      use: "raw-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
