/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  // Görsellerin ve CSS'in ana sitede kırılmaması için:
  assetPrefix: 'https://gemicha-portal.vercel.app',
};

export default nextConfig;
