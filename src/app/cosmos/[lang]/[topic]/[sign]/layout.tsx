import { Metadata } from 'next';
import { getBaseIdFromLocalized, getUIString, ZODIAC_DICT, TOPICS_DICT, safeUpper } from '../../../../../lib/cosmos-constants';

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

  const title = `${safeUpper(displaySign, lang)} - ${safeUpper(displayTopic, lang)} | GEMICHA`;
  const description = `Gemicha Neural Report: ${safeUpper(displaySign, lang)} burcu için güncel ${displayTopic} analizi ve astrolojik öngörüler. Kozmik zekanın rehberliğini keşfet.`;

  const url = `https://www.gemicha.com/cosmos/${lang}/${localizedTopicSlug}/${localizedSignSlug}`;
  const imageUrl = `https://gemicha-portal.vercel.app/images/zodiac/${baseSign}.webp`;

  return {
    title,
    description,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
