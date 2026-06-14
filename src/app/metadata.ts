import type { Metadata } from "next";
import { images } from "@/config/images";
import { serverEnv } from "@/config/server-env.config";
import { getRobotsMetadata, getSiteUrl } from "@/lib/site";

export const siteName = "Pere Barceló - Psicólogo Deportivo";
const description =
  "Pere Barceló Lambea - Psicólogo Deportivo en Mallorca. Especializado en psicología del deporte para deportistas, equipos y clubes deportivos.";
const keywords =
  "psicología deportiva, psicólogo deportivo mallorca, rendimiento deportivo, psicología del deporte, entrenamiento mental, deporte mallorca, psicología deportiva baleares";
const googleVerification = serverEnv.GOOGLE_SITE_VERIFICATION;

const siteUrl = getSiteUrl();

const defaultOgImage = {
  url: `${siteUrl}${images.ogDefault}`,
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
    locale: "es_ES", // overridden per-page in createPageMetadata
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
  robots: getRobotsMetadata(),
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  alternates: {
    canonical: "/",
    languages: {
      "x-default": `${siteUrl}/`,
      es: `${siteUrl}/`,
      ca: `${siteUrl}/ca/`,
    },
  },
  icons: {
    icon: [
      { url: images.faviconIco, type: "image/x-icon" },
      { url: images.favicon16, sizes: "16x16", type: "image/png" },
      { url: images.favicon32, sizes: "32x32", type: "image/png" },
    ],
    apple: images.appleTouchIcon,
  },
  manifest: "/site.webmanifest",
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  locale: string;
  imagePath?: string;
  imageUrl?: string;
  keywords?: string | string[];
}

export function createPageMetadata({
  title,
  description,
  path,
  locale,
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

  return {
    ...defaultMetadata,
    title,
    description,
    keywords: keywords || defaultMetadata.keywords,
    alternates: {
      ...defaultMetadata.alternates,
      canonical,
      languages: {
        "x-default": canonical,
        es: canonical,
        ca: `${siteUrl}/ca${path}`,
      },
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      locale: locale === "ca" ? "ca_ES" : "es_ES",
      url: canonical,
      title,
      description,
      images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: images.map((image) => image.url),
    },
  };
}
