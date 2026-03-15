import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GEMICHA COSMOS | Neural Astrology',
  description: 'Gemicha Neural Report: Yapay zeka destekli günlük astroloji ve burç analizleri. Kozmik zekanın rehberliğini keşfet.',
  openGraph: {
    title: 'GEMICHA COSMOS | Neural Astrology',
    description: 'Yapay zeka destekli günlük astroloji ve burç analizleri. Kozmik zekanın rehberliğini keşfet.',
    url: 'https://www.gemicha.com/cosmos',
    siteName: 'GEMICHA',
    images: [
      {
        url: 'https://gemicha-portal.vercel.app/images/cosmos-cover.webp',
        width: 1200,
        height: 675,
        alt: 'Gemicha Cosmos Zodiac Wheel',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEMICHA COSMOS | Neural Astrology',
    description: 'Yapay zeka destekli günlük astroloji ve burç analizleri.',
    images: ['https://gemicha-portal.vercel.app/images/cosmos-cover.webp'],
  },
};

export default function CosmosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
