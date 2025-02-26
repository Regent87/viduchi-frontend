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
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      const ADMIN_API_URL = process.env.ADMIN_API_URL;
      const RENDER_SERVER_URL = process.env.RENDER_SERVER_URL;

      return [
        {
          source: '/admin-api/:path*',
          destination: `${ADMIN_API_URL}/:path*`,
        },
        {
          source: '/render/:path*',
          destination: `${RENDER_SERVER_URL}/:path*`,
        },
      ];
    } else {
      return [
        {
          source: '/admin-api/:path*',
          destination: '/admin-api/:path*',
        },
        {
          source: '/render/:path*',
          destination: '/render/:path*',
        },
      ];
    }
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
      {
        protocol: 'http',
        hostname: 'localhost',
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
