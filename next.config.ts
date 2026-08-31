import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Mengizinkan semua path gambar dari Unsplash
      },
    ],
  },
};

module.exports = nextConfig;


export default nextConfig;