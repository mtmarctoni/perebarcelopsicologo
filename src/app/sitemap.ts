import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/config/routes";
import { getSiteUrl, isProduction } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProduction()) {
    return [];
  }

  const siteUrl = getSiteUrl();

  const staticRoutes = sitemapRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
    alternates: {
      languages: {
        "x-default": `${siteUrl}${route}`,
        es: `${siteUrl}${route}`,
        ca: `${siteUrl}/ca${route}`,
      },
    },
  }));

  return staticRoutes;
}
