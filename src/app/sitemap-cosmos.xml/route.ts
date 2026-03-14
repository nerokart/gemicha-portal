import { ACTIVE_COSMOS_LANGS, ZODIAC_SIGNS, TOPICS_DICT, ZODIAC_DICT, slugify, getUIString } from '../../lib/cosmos-constants';

export async function GET() {
  const baseUrl = 'https://www.gemicha.com';
  const topics = ['ask', 'kariyer', 'saglik', 'para'];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Cosmos Ana Sayfası
  xml += `  <url>\n    <loc>${baseUrl}/cosmos</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

  // 46 Dildeki 2208 Alt Sayfa
  ACTIVE_COSMOS_LANGS.forEach((lang) => {
    ZODIAC_SIGNS.forEach((signObj) => {
      topics.forEach((topic) => {
        const topicSlug = slugify(getUIString(TOPICS_DICT, lang, topic, topic));
        const signSlug = slugify(getUIString(ZODIAC_DICT, lang, signObj.id, signObj.id));

        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/cosmos/${lang}/${topicSlug}/${signSlug}</loc>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });
    });
  });

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate', // 1 gün önbellekte tut, sunucuyu yorma
    },
  });
}