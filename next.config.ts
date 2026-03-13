// gemicha-v3 (Ana Site) / next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/cosmos/:path*',
        destination: 'https://gemicha-portal.vercel.app/cosmos/:path*', 
        // Not: Senin o uzun linkin yerine projenin ana Vercel linkini yazdık.
      },
    ]
  },
}
