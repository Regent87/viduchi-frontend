/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm)$/,
  //     type: 'asset',
  //     generator: {
  //       filename: 'static/chunks/[path][name].[hash][ext]'
  //     },
  //   });
  //   return config;
  // },

  async rewrites() {
    return [
      {
        source: '/admin-api/:path*',
        destination: '/admin-api/:path*',
      },
      {
        source: '/mobile-api/:path*',
        destination: '/mobile-api/:path*',
      },
      {
        source: '/file-service/:path*',
        destination: '/file-service/:path*',
      },
      {
        source: '/files/:path*',
        destination: '/files/:path*',
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-dev.viduchi.ru',
      },
      {
        protocol: 'https',
        hostname: 'dev.viduchi.ru',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: false
};

export default nextConfig;
