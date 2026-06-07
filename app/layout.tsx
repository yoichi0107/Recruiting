import type { Metadata } from 'next';
import { Inter_Tight, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

const siteUrl = 'https://recruit.107designinc.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'オープンポジション募集 | 107 Design',
  description:
    '107 Designで一緒に5年、10年、同じ景色を追いかけられる仲間を探しています。職種は決めません。価値観で出会う採用です。',
  icons: {
    icon: '/images/107design-logo.png',
  },
  openGraph: {
    title: 'オープンポジション募集 | 107 Design',
    description:
      '107 Designで一緒に5年、10年、同じ景色を追いかけられる仲間を探しています。職種は決めません。価値観で出会う採用です。',
    url: siteUrl,
    siteName: '107 Design',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'オープンポジション募集 | 107 Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'オープンポジション募集 | 107 Design',
    description:
      '107 Designで一緒に5年、10年、同じ景色を追いかけられる仲間を探しています。職種は決めません。価値観で出会う採用です。',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${interTight.variable} ${notoSansJP.variable}`}>
      <body>{children}</body>
    </html>
  );
}
