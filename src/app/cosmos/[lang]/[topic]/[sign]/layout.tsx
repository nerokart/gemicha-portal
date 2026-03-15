import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js'; // YENİ EKLENDİ: Supabase bağlantısı
import { getBaseIdFromLocalized, getUIString, ZODIAC_DICT, TOPICS_DICT, safeUpper } from '../../../../../lib/cosmos-constants';

// YENİ EKLENDİ: Sunucu tarafında veritabanı sorgusu yapabilmek için client oluşturuyoruz
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

type Props = {
  // KRİTİK DÜZELTME: params artık bir Promise, bu yüzden tipini Promise olarak ayarladık.
  params: Promise<{ lang: string; topic: string; sign: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // KRİTİK DÜZELTME 2: Gecikmeli gelen veriyi await ile bekliyoruz. UNDEFINED hatası burada yok ediliyor!
  const resolvedParams = await params;
  const { lang, topic: localizedTopicSlug, sign: localizedSignSlug } = resolvedParams;

  const decodedTopic = decodeURIComponent(localizedTopicSlug);
  const decodedSign = decodeURIComponent(localizedSignSlug);

  const baseSign = getBaseIdFromLocalized(ZODIAC_DICT, lang, decodedSign);
  const baseTopic = getBaseIdFromLocalized(TOPICS_DICT, lang, decodedTopic);

  const displaySign = getUIString(ZODIAC_DICT, lang, baseSign, baseSign);
  const displayTopic = getUIString(TOPICS_DICT, lang, baseTopic, baseTopic);

  // YENİ EKLENDİ: Google Botları "Data Missing" görmesin diye o günün verisini sunucuda çekiyoruz!
  const today = new Date().toISOString().split('T')[0];
  const { data: insight } = await supabase
    .from('gemicha_insights')
    .select('meta_title, content_body')
    .ilike('language', lang)
    .ilike('topic', baseTopic)
    .ilike('zodiac_sign', baseSign)
    .eq('target_date', today)
    .single();

  const title = `${safeUpper(displaySign, lang)} - ${safeUpper(displayTopic, lang)} | GEMICHA`;
  const description = `Gemicha Neural Report: ${safeUpper(displaySign, lang)} burcu için güncel ${displayTopic} analizi ve astrolojik öngörüler. Kozmik zekanın rehberliğini keşfet.`;

  // YENİ EKLENDİ: Veritabanından veri geldiyse onu kullan, gelmediyse senin orijinal başlıklarını (yukarıdaki) kullan
  const dynamicTitle = insight?.meta_title ? safeUpper(insight.meta_title, lang) : title;
  const dynamicDescription = insight?.content_body ? insight.content_body.substring(0, 160).trim() + "..." : description;

  const url = `https://www.gemicha.com/cosmos/${lang}/${localizedTopicSlug}/${localizedSignSlug}`;
  const imageUrl = `https://gemicha-portal.vercel.app/images/zodiac/${baseSign}.webp`;

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: [displaySign, displayTopic, 'Gemicha', 'astroloji', 'burç yorumları', `${displaySign} ${displayTopic}`, 'yapay zeka astroloji', 'neural report'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: dynamicTitle,
      description: dynamicDescription,
      url,
      siteName: 'GEMICHA',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${displaySign} ${displayTopic} - Gemicha`,
        },
      ],
      locale: lang,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: dynamicTitle,
      description: dynamicDescription,
      images: [imageUrl],
    },
  };
}

// JSON-LD Schema Kodunu da barındıran Asenkron Layout kalkanı
export default async function ZodiacSeoLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ lang: string; topic: string; sign: string }>;
}) {
  const resolvedParams = await params;
  const { lang, topic: localizedTopicSlug, sign: localizedSignSlug } = resolvedParams;

  const decodedTopic = decodeURIComponent(localizedTopicSlug);
  const decodedSign = decodeURIComponent(localizedSignSlug);
  
  const baseSign = getBaseIdFromLocalized(ZODIAC_DICT, lang, decodedSign);
  const baseTopic = getBaseIdFromLocalized(TOPICS_DICT, lang, decodedTopic);

  const displaySign = getUIString(ZODIAC_DICT, lang, baseSign, baseSign);
  const displayTopic = getUIString(TOPICS_DICT, lang, baseTopic, baseTopic);

  // YENİ EKLENDİ: Google'ın okuduğu yapısal veri (JSON-LD) içine de gerçek makale verisini yerleştiriyoruz
  const today = new Date().toISOString().split('T')[0];
  const { data: insight } = await supabase
    .from('gemicha_insights')
    .select('meta_title, content_body')
    .ilike('language', lang)
    .ilike('topic', baseTopic)
    .ilike('zodiac_sign', baseSign)
    .eq('target_date', today)
    .single();

  const dynamicTitle = insight?.meta_title ? safeUpper(insight.meta_title, lang) : `${safeUpper(displaySign, lang)} - ${safeUpper(displayTopic, lang)} | GEMICHA`;
  const dynamicDescription = insight?.content_body ? insight.content_body.substring(0, 160).trim() + "..." : `Gemicha Neural Report: ${displaySign} için güncel ${displayTopic} analizi.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": dynamicTitle,
    "image": `https://gemicha-portal.vercel.app/images/zodiac/${baseSign}.webp`,
    "author": {
      "@type": "Organization",
      "name": "Gemicha Neural Astrologer",
      "url": "https://www.gemicha.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GEMICHA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gemicha-portal.vercel.app/logo.png"
      }
    },
    "datePublished": new Date().toISOString().split('T')[0],
    "description": dynamicDescription
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
