import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Eğer botların girmesini istemediğin bir API veya admin rotası olursa buraya ekleyebilirsin
      disallow: ['/api/'], 
    },
    sitemap: 'https://www.gemicha.com/sitemap.xml',
  };
}