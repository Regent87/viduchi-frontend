import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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


  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-dev.viduchi.ru',
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
