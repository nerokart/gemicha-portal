// Next.js'in bu sayfayı eksik önbelleğe almasını engeller (Zorunlu Dinamik)
export const dynamic = 'force-dynamic';

import { ZODIAC_DICT, TOPICS_DICT, slugify, getUIString } from '../../lib/cosmos-constants';

export async function GET() {
  const baseUrl = 'https://www.gemicha.com';

  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() + 1); 
  const targetDate = dateObj.toISOString().split('T')[0];

  const langs = [
    "tr", "en", "ar", "de", "es", "fr", "it", "pt", "ru", "zh", "ja", "ko", 
    "nl", "pl", "sv", "da", "fi", "no", "cs", "hu", "ro", "el", "he", "hi", 
    "bn", "id", "ms", "th", "vi", "uk", "fa", "ur", "ta", "te", "bg", "tl", 
    "hr", "sr", "sk", "sl", "et", "lv", "lt", "ca", "az", "kk"
  ];

  const zodiacs = [
    'koc', 'boga', 'ikizler', 'yengec', 'aslan', 'basak', 
    'terazi', 'akrep', 'yay', 'oglak', 'kova', 'balik'
  ];

  const topics = ['ask', 'kariyer', 'saglik', 'para'];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  xml += `  <url>\n    <loc>${baseUrl}/cosmos</loc>\n    <lastmod>${targetDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

  langs.forEach((lang) => {
    zodiacs.forEach((sign) => {
      topics.forEach((topic) => {
        
        // KELİMELERİ SÖZLÜKTEN O DİLE ÇEVİRİP KÜÇÜK HARFE (URL FORMATINA) ÇEVİRİYORUZ
        const localizedTopic = slugify(getUIString(TOPICS_DICT, lang, topic, topic));
        const localizedSign = slugify(getUIString(ZODIAC_DICT, lang, sign, sign));

        xml += `  <url>\n`;
        // TÜRKÇE YERİNE ARTIK ÇEVRİLMİŞ (LOKALİZE) KELİMELER BASILIYOR
        xml += `    <loc>${baseUrl}/cosmos/${lang}/${localizedTopic}/${localizedSign}</loc>\n`;
        xml += `    <lastmod>${targetDate}</lastmod>\n`; 
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
      'Cache-Control': 's-maxage=3600, stale-while-revalidate', 
    },
  });
}
