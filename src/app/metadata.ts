import type { Metadata } from "next";
import { images } from "@/config/images";
import { serverEnv } from "@/config/server-env.config";
import { getLocalizedPageUrl, getPageAlternates } from "@/lib/seo-urls";
import { getCanonicalUrl, getRobotsMetadata } from "@/lib/site";

export const siteName = "Pere Barceló - Psicólogo Deportivo Online";
const description =
  "Pere Barceló Lambea - Psicólogo Deportivo Online en Mallorca. Especializado en psicología del deporte con sesiones online para deportistas, equipos y clubes deportivos.";
const keywords =
  "psicología deportiva, psicólogo deportivo online, psicólogo deportivo mallorca, psicología deportiva online, rendimiento deportivo, psicología del deporte, entrenamiento mental, deporte mallorca, sesiones online psicología deportiva, psicología deportiva baleares, terapia online deportistas";
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
    canonical: siteUrl,
    languages: getPageAlternates(siteUrl, "/"),
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
  const canonical = getLocalizedPageUrl(siteUrl, path, locale);
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
      languages: getPageAlternates(siteUrl, path),
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
