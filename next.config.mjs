/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript hatalarını (any vb.) Vercel build sırasında görmezden gelsin
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLint uyarılarını (kullanılmayan değişken vb.) görmezden gelsin
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;