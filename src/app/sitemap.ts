import { MetadataRoute } from 'next';
import { ACTIVE_COSMOS_LANGS, ZODIAC_SIGNS, TOPICS_DICT, ZODIAC_DICT, slugify, getUIString } from '../lib/cosmos-constants';

export default function sitemap(): MetadataRoute.Sitemap {
  // Alan adını buraya yazıyoruz
  const baseUrl = 'https://www.gemicha.com';

  // 1. ANA VE STATİK SAYFALAR
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/cosmos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/characters`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // 2. 46 DİLDEKİ TÜM KOZMİK KOMBİNASYONLAR (2208 Sayfa)
  const cosmosRoutes: MetadataRoute.Sitemap = [];
  const topics = ['ask', 'kariyer', 'saglik', 'para'];

  ACTIVE_COSMOS_LANGS.forEach((lang) => {
    ZODIAC_SIGNS.forEach((signObj) => {
      topics.forEach((topic) => {
        // Sabitlerimizden o dile ait temizlenmiş (slug) URL parçalarını alıyoruz
        const topicSlug = slugify(getUIString(TOPICS_DICT, lang, topic, topic));
        const signSlug = slugify(getUIString(ZODIAC_DICT, lang, signObj.id, signObj.id));
        
        cosmosRoutes.push({
          url: `${baseUrl}/cosmos/${lang}/${topicSlug}/${signSlug}`,
          lastModified: new Date(),
          changeFrequency: 'daily', // Google'a "Bu sayfa her gün güncelleniyor, her gün gel" diyoruz.
          priority: 0.7,
        });
      });
    });
  });

  // Statik ve dinamik rotaları birleştirip arama motorlarına sunuyoruz
  return [...staticRoutes, ...cosmosRoutes];
}