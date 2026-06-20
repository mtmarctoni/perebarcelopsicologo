import type { Metadata } from "next";
import { images } from "@/config/images";
import { serverEnv } from "@/config/server-env.config";
import { getCanonicalUrl, getRobotsMetadata } from "@/lib/site";

export const siteName = "Pere Barceló - Psicólogo Deportivo";
const description =
  "Pere Barceló Lambea - Psicólogo Deportivo en Mallorca. Especializado en psicología del deporte para deportistas, equipos y clubes deportivos.";
const keywords =
  "psicología deportiva, psicólogo deportivo mallorca, rendimiento deportivo, psicología del deporte, entrenamiento mental, deporte mallorca, psicología deportiva baleares";
const googleVerification = serverEnv.GOOGLE_SITE_VERIFICATION;

const siteUrl = getCanonicalUrl();

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

/** Build a canonical URL that includes the locale prefix for non-default locales. */
function buildCanonicalUrl(path: string, locale: string): string {
  const localePath = locale === "es" ? path : `/ca${path}`;
  return path === "/" && locale === "es" ? siteUrl : `${siteUrl}${localePath}`;
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
  const canonical = buildCanonicalUrl(path, locale);
  const resolvedImageUrl = imageUrl || (imagePath ? `${siteUrl}${imagePath}` : defaultOgImage.url);
  const images = [
    {
      url: resolvedImageUrl,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];

  // Build hreflang URLs - each language points to its own version
  const esPath = path === "/" ? "" : path;
  const caPath = `/ca${path}`;

  return {
    ...defaultMetadata,
    title,
    description,
    keywords: keywords || defaultMetadata.keywords,
    alternates: {
      ...defaultMetadata.alternates,
      canonical,
      languages: {
        "x-default": `${siteUrl}${esPath}`,
        es: `${siteUrl}${esPath}`,
        ca: `${siteUrl}${caPath}`,
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
