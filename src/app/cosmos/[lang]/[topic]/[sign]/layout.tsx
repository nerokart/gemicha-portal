import { Metadata } from 'next';
import { getBaseIdFromLocalized, getUIString, ZODIAC_DICT, TOPICS_DICT, safeUpper } from '../../../../../lib/cosmos-constants';

type Props = {
  params: { lang: string; topic: string; sign: string };
  children: React.ReactNode;
};

// 1. BÖLÜM: GOOGLE VE SOSYAL MEDYA (OpenGraph) META ETİKETLERİNİ DİNAMİK ÜRETEN MOTOR
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, topic: localizedTopicSlug, sign: localizedSignSlug } = params;

  // URL'deki Kiril/Arapça/Türkçe harfleri çözüyoruz (Decode)
  const decodedTopic = decodeURIComponent(localizedTopicSlug);
  const decodedSign = decodeURIComponent(localizedSignSlug);

  // Bu lokalize kelimelerin (örn: любов) İngilizce/Türkçe temel ID'lerini (örn: ask) buluyoruz
  const baseSign = getBaseIdFromLocalized(ZODIAC_DICT, lang, decodedSign);
  const baseTopic = getBaseIdFromLocalized(TOPICS_DICT, lang, decodedTopic);

  // Ekrana basılacak gerçek çevirileri alıyoruz
  const displaySign = getUIString(ZODIAC_DICT, lang, baseSign, baseSign);
  const displayTopic = getUIString(TOPICS_DICT, lang, baseTopic, baseTopic);

  // Dinamik SEO Başlığı ve Açıklaması
  const title = `${safeUpper(displaySign, lang)} - ${safeUpper(displayTopic, lang)} | GEMICHA`;
  const description = `Gemicha Neural Report: ${safeUpper(displaySign, lang)} burcu için güncel ${displayTopic} analizi ve astrolojik öngörüler. Kozmik zekanın rehberliğini keşfet.`;

  const url = `https://www.gemicha.com/cosmos/${lang}/${localizedTopicSlug}/${localizedSignSlug}`;
  // O burcun kapak resmini otomatik çekiyoruz
  const imageUrl = `https://gemicha-portal.vercel.app/images/zodiac/${baseSign}.webp`;

  return {
    title,
    description,
    // YENİ EKLENEN SATIR: Yandex, Bing ve global ağlar için dinamik anahtar kelimeler
    keywords: [displaySign, displayTopic, 'Gemicha', 'astroloji', 'burç yorumları', `${displaySign} ${displayTopic}`, 'yapay zeka astroloji', 'neural report'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
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
      title,
      description,
      images: [imageUrl],
    },
  };
}

// 2. BÖLÜM: GOOGLE İÇİN JSON-LD SCHEMA (YAPI KODU) ÜRETEN KALKAN
export default function ZodiacSeoLayout({ children, params }: Props) {
  const { lang, topic: localizedTopicSlug, sign: localizedSignSlug } = params;

  const decodedTopic = decodeURIComponent(localizedTopicSlug);
  const decodedSign = decodeURIComponent(localizedSignSlug);
  
  const baseSign = getBaseIdFromLocalized(ZODIAC_DICT, lang, decodedSign);
  const baseTopic = getBaseIdFromLocalized(TOPICS_DICT, lang, decodedTopic);

  const displaySign = getUIString(ZODIAC_DICT, lang, baseSign, baseSign);
  const displayTopic = getUIString(TOPICS_DICT, lang, baseTopic, baseTopic);

  // Google Botlarına "Bu bir Astroloji Makalesidir" diyoruz
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${safeUpper(displaySign, lang)} - ${safeUpper(displayTopic, lang)} | GEMICHA`,
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
    "description": `Gemicha Neural Report: ${displaySign} için güncel ${displayTopic} analizi.`
  };

  return (
    <>
      {/* JSON-LD Schema Kodunu Sayfanın Görünmez Kısmına Gömüyoruz */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Senin Orijinal Makale Sayfan (page.tsx) Burada Çalışmaya Devam Eder */}
      {children}
    </>
  );
}
