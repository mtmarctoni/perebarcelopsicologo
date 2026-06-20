import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/config/routes";
import { getCanonicalUrl, isProduction } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProduction()) {
    return [];
  }

  const canonicalUrl = getCanonicalUrl();

  const staticRoutes = sitemapRoutes.map((route) => ({
    url: `${canonicalUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
    alternates: {
      languages: {
        "x-default": `${canonicalUrl}${route}`,
        es: `${canonicalUrl}${route}`,
        ca: `${canonicalUrl}/ca${route}`,
      },
    },
  }));

  return staticRoutes;
}
