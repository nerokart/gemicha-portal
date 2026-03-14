// Next.js'in bu sayfayı eksik önbelleğe almasını engeller (Zorunlu Dinamik)
export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = 'https://www.gemicha.com';

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
  xml += `  <url>\n    <loc>${baseUrl}/cosmos</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

  // 2. 46 Dil x 12 Burç x 4 Konu = Tam 2208 Alt Sayfa
  langs.forEach((lang) => {
    zodiacs.forEach((sign) => {
      topics.forEach((topic) => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/cosmos/${lang}/${topic}/${sign}</loc>\n`;
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
      'Cache-Control': 's-maxage=86400, stale-while-revalidate', // Sunucuyu yormadan 1 gün önbellekte tutar
    },
  });
}
