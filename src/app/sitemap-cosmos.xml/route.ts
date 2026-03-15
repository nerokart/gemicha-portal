// Next.js'in bu sayfayı eksik önbelleğe almasını engeller (Zorunlu Dinamik)
export const dynamic = 'force-dynamic';

// Sabitleri ve çeviri fonksiyonlarını içeri aktarıyoruz (Dosya yolu projenizin klasör yapısına göre '../../lib/cosmos-constants' gibi değişebilir)
import { ZODIAC_DICT, TOPICS_DICT, slugify, getUIString } from '../../../lib/cosmos-constants';

export async function GET() {
  const baseUrl = 'https://www.gemicha.com';

  // YARININ TARİHİNİ OTOMATİK HESAPLAMA (AI Motoru ile tam senkronize)
  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() + 1); // Bugüne +1 gün ekler
  const targetDate = dateObj.toISOString().split('T')[0]; // Çıktı: "2026-03-15"

  // Dışarıya bağımlılığı kestik, 46 dilin tamamını buraya gömdük
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

  // 1. Cosmos Ana Sayfası
  xml += `  <url>\n    <loc>${baseUrl}/cosmos</loc>\n    <lastmod>${targetDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

  // 2. 46 Dil x 12 Burç x 4 Konu = Tam 2208 Alt Sayfa
  langs.forEach((lang) => {
    zodiacs.forEach((sign) => {
      topics.forEach((topic) => {
        
        // URL'DEKİ KELİMELERİ GEÇERLİ DİLE ÇEVİRİP KÜÇÜK HARFE (SLUG) DÖNÜŞTÜRÜYORUZ
        const localizedTopic = slugify(getUIString(TOPICS_DICT, lang, topic, topic));
        const localizedSign = slugify(getUIString(ZODIAC_DICT, lang, sign, sign));

        xml += `  <url>\n`;
        // TÜRKÇE KELİMELER YERİNE ARTIK YUKARIDAKİ ÇEVRİLMİŞ (LOCALIZED) KELİMELER BASILACAK
        xml += `    <loc>${baseUrl}/cosmos/${lang}/${localizedTopic}/${localizedSign}</loc>\n`;
        xml += `    <lastmod>${targetDate}</lastmod>\n`; // HER GÜN OTOMATİK GÜNCELLENEN TARİH ETİKETİ
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
      // Önbellekte 1 tam gün yerine 1 saat tutuyoruz (Gece 00:00'ı geçer geçmez sitemap'in tarihleri yenilensin diye)
      'Cache-Control': 's-maxage=3600, stale-while-revalidate', 
    },
  });
}
