/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  // SİHİRLİ DOKUNUŞ: Tarayıcıya CSS ve JS dosyalarını nereden alacağını kesin olarak söyler
  assetPrefix: 'https://gemicha-portal.vercel.app',
};

export default nextConfig;
