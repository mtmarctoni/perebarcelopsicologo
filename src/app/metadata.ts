import { Metadata } from "next";

import { serverEnv } from "@/config/server-env.config";

export const siteUrl = "https://perebarcelopsicologo.com";
export const siteName = "Pere Barceló - Psicólogo Deportivo";
const description =
  "Pere Barceló Lambea - Psicólogo Deportivo en Mallorca. Especializado en psicología del deporte para deportistas, equipos y clubes deportivos.";
const keywords =
  "psicología deportiva, psicólogo deportivo mallorca, rendimiento deportivo, psicología del deporte, entrenamiento mental, deporte mallorca, psicología deportiva baleares";
const googleVerification = serverEnv.GOOGLE_SITE_VERIFICATION;

const defaultOgImage = {
  url: `${siteUrl}/stock/alcanza-tu-objetivo.webp`,
  width: 1200,
  height: 630,
  alt: siteName,
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: description,
  keywords: keywords,
  authors: [{ name: "Pere Barceló Lambea" }],
  creator: "Pere Barceló Lambea",
  publisher: "Pere Barceló Lambea",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: description,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: description,
    images: [defaultOgImage.url],
    creator: "@PBarceloPsico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  imageUrl?: string;
  keywords?: string | string[];
}

export function createPageMetadata({
  title,
  description,
  path,
  imagePath,
  imageUrl,
  keywords,
}: PageMetadataOptions): Metadata {
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const resolvedImageUrl = imageUrl || (imagePath ? `${siteUrl}${imagePath}` : defaultOgImage.url);
  const images = [
    {
      url: resolvedImageUrl,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];

  return getPageMetadata({
    title,
    description,
    keywords: keywords || defaultMetadata.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: canonical,
      title,
      description,
      images,
    },
    twitter: {
      title,
      description,
      images: images.map((image) => image.url),
    },
  });
}

// Helper function to generate page-specific metadata
export function getPageMetadata(metadata: Partial<Metadata> = {}): Metadata {
  return {
    ...defaultMetadata,
    ...metadata,
    title: metadata.title || defaultMetadata.title,
    alternates: {
      ...defaultMetadata.alternates,
      ...metadata.alternates,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      ...metadata.openGraph,
      title: metadata.title || defaultMetadata.openGraph?.title,
      description:
        metadata.description || defaultMetadata.openGraph?.description,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...metadata.twitter,
      title: metadata.title || defaultMetadata.twitter?.title,
      description: metadata.description || defaultMetadata.twitter?.description,
    },
  };
}
