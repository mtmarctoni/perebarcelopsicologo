const defaultTitle = 'Pere Barceló - Psicólogo Deportivo';
const defaultDescription = 'Pere Barceló Lambea - Psicólogo Deportivo en Mallorca. Especializado en psicología del deporte para deportistas, equipos y clubes deportivos.';
const siteUrl = 'https://perebarcelopsicologo.com';

export default {
  titleTemplate: '%s | Pere Barceló',
  defaultTitle,
  description: defaultDescription,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    site_name: defaultTitle,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    handle: '@perebarcelpsico',
    site: '@perebarcelpsico',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'psicología deportiva, psicólogo deportivo mallorca, rendimiento deportivo, psicología del deporte, entrenamiento mental, deporte mallorca, psicología deportiva baleares',
    },
    {
      name: 'author',
      content: 'Pere Barceló Lambea',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};
