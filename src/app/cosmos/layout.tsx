import { Metadata } from 'next';
// 💡 DÜZELTME: Dosya yolu ../../../ yerine ../../ yapıldı
import { UI_DICT, getUIString, safeUpper } from '../../lib/cosmos-constants';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  // Sözlükten (UI_DICT) çevirileri alıyoruz
  const cosmosTitle = getUIString(UI_DICT, lang, 'cosmos', 'COSMOS');
  const description = getUIString(UI_DICT, lang, 'warning', 'Gemicha Neural Report: AI-generated daily astrology and zodiac analysis.');

  const title = `${safeUpper(cosmosTitle, lang)} | GEMICHA`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.gemicha.com/cosmos/${lang}`,
      siteName: 'GEMICHA',
      images: [
        {
          url: 'https://gemicha-portal.vercel.app/images/cosmos-cover.webp',
          width: 1200,
          height: 675,
          alt: 'Gemicha Cosmos',
        },
      ],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://gemicha-portal.vercel.app/images/cosmos-cover.webp'],
    },
  };
}

export default function CosmosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
