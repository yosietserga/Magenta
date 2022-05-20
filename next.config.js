module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  experimental: { images: { layoutRaw: true } },
  reactStrictMode: true,
};