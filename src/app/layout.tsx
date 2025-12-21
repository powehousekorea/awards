import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '대한민국 청년정책 어워즈',
  description: '청년이 직접 선정하는 대한민국 최고의 청년정책 시상식입니다.',
  keywords: ['청년정책', '어워즈', '청년', '정책', '시상식'],
  openGraph: {
    title: '대한민국 청년정책 어워즈',
    description: '청년이 직접 선정하는 대한민국 최고의 청년정책 시상식',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Korea Youth Policy Awards - 대한민국 청년정책 어워즈',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '대한민국 청년정책 어워즈',
    description: '청년이 직접 선정하는 대한민국 최고의 청년정책 시상식',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Naver Site Verification */}
        <meta name="naver-site-verification" content="6cbfef53d193fc09605526cf8594653cbc97e780" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WPBF3ZJ5');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Noto Serif KR - 권위있는 세리프 폰트 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Noto+Serif+KR:wght@400;500;600;700;900&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Pretendard for body text */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-dark-950">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPBF3ZJ5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
