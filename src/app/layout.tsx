import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { defaultMetadata } from "./metadata";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL('https://perebarcelopsicologo.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Replace with actual verification code
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

const PrivacySettings = () => (
  <>
    <Script
      id="humanity-options"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var huOptions = {
            'appID': 'perebarcelopsicologocom-5e860ea',
            'currentLanguage': 'en',
            'blocking': true,
            'globalCookie': false
          }
        `
      }}
    />
    <Script
      id="humanity-banner"
      src="https://cdn.hu-manity.co/hu-banner.min.js"
      strategy="afterInteractive"
    />
  </>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <head>
        <PrivacySettings />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preload critical assets */}
        {/* <link rel="preload" href="/stock/alcanza-tu-objetivo.webp" as="image" /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white dark:bg-gray-900 font-sans antialiased`}>
        <Providers
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
