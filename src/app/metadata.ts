import type { Metadata } from "next";
import { headers } from "next/headers";

import { serverEnv } from "@/config/server-env.config";
import { getRobotsMetadata, getSiteUrl } from "@/lib/site";

export const siteName = "Pere Barceló - Psicólogo Deportivo";
const description =
  "Pere Barceló Lambea - Psicólogo Deportivo en Mallorca. Especializado en psicología del deporte para deportistas, equipos y clubes deportivos.";
const keywords =
  "psicología deportiva, psicólogo deportivo mallorca, rendimiento deportivo, psicología del deporte, entrenamiento mental, deporte mallorca, psicología deportiva baleares";
const googleVerification = serverEnv.GOOGLE_SITE_VERIFICATION;

export function getDefaultOgImage(siteUrl: string) {
  return {
    url: `${siteUrl}/stock/alcanza-tu-objetivo.webp`,
    width: 1200,
    height: 630,
    alt: siteName,
  };
}

export function getDefaultMetadata(host?: string): Metadata {
  const siteUrl = getSiteUrl(host);
  const ogImage = getDefaultOgImage(siteUrl);
  const robots = getRobotsMetadata(host);

  return {
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
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: description,
      images: [ogImage.url],
      creator: "@PBarceloPsico",
    },
    robots,
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: "/favicon-32x32.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

// Re-export for backward compatibility
export const siteUrl = getSiteUrl();
export const defaultMetadata = getDefaultMetadata();

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  imageUrl?: string;
  keywords?: string | string[];
  host?: string;
}

export async function createPageMetadata({
  title,
  description,
  path,
  imagePath,
  imageUrl,
  keywords,
  host,
}: PageMetadataOptions): Promise<Metadata> {
  // If host is not provided, try to get it from headers
  const resolvedHost = host || (await headers()).get("host") || "";
  const siteUrl = getSiteUrl(resolvedHost);
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const ogImage = getDefaultOgImage(siteUrl);
  const resolvedImageUrl = imageUrl || (imagePath ? `${siteUrl}${imagePath}` : ogImage.url);
  const images = [
    {
      url: resolvedImageUrl,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];

  return getPageMetadata(
    {
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
    },
    resolvedHost,
  );
}

// Helper function to generate page-specific metadata
export function getPageMetadata(metadata: Partial<Metadata> = {}, host?: string): Metadata {
  const base = getDefaultMetadata(host);

  return {
    ...base,
    ...metadata,
    title: metadata.title || base.title,
    alternates: {
      ...base.alternates,
      ...metadata.alternates,
    },
    openGraph: {
      ...base.openGraph,
      ...metadata.openGraph,
      title: metadata.title || base.openGraph?.title,
      description: metadata.description || base.openGraph?.description,
    },
    twitter: {
      ...base.twitter,
      ...metadata.twitter,
      title: metadata.title || base.twitter?.title,
      description: metadata.description || base.twitter?.description,
    },
  };
}
