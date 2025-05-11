import { Metadata } from 'next';

const siteUrl = 'https://perebarcelopsicologo.com';
const siteName = 'Pere Barceló - Psicólogo Deportivo';
const description = 'Pere Barceló Lambea - Psicólogo Deportivo en Mallorca. Especializado en psicología del deporte para deportistas, equipos y clubes deportivos.';
const keywords = 'psicología deportiva, psicólogo deportivo mallorca, rendimiento deportivo, psicología del deporte, entrenamiento mental, deporte mallorca, psicología deportiva baleares';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  description: description,
  keywords: keywords,
  authors: [{ name: 'Pere Barceló Lambea' }],
  creator: 'Pere Barceló Lambea',
  publisher: 'Pere Barceló Lambea',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: description,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: description,
    images: ['/images/og-image.jpg'],
    creator: '@perebarcelpsico',
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
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Add your Google Search Console verification code
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

// Helper function to generate page-specific metadata
export function getPageMetadata(metadata: Partial<Metadata> = {}): Metadata {
  return {
    ...defaultMetadata,
    ...metadata,
    title: metadata.title ? 
      { ...defaultMetadata.title, ...(typeof metadata.title === 'string' ? { default: metadata.title } : metadata.title) } : 
      defaultMetadata.title,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...metadata.openGraph,
      title: metadata.title ? (typeof metadata.title === 'string' ? metadata.title : metadata.title.default) : defaultMetadata.openGraph?.title,
      description: metadata.description || defaultMetadata.openGraph?.description,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...metadata.twitter,
      title: metadata.title ? (typeof metadata.title === 'string' ? metadata.title : metadata.title.default) : defaultMetadata.twitter?.title,
      description: metadata.description || defaultMetadata.twitter?.description,
    },
  };
}
