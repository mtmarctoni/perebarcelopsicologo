import type { MetadataRoute } from "next";

import { getSiteUrl, isProduction } from "@/lib/site";

const routes = ["", "/about", "/contact", "/privacy", "/servicios"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Only serve sitemap on production to prevent indexing of staging/preview URLs
  if (!isProduction()) {
    return [];
  }

  const siteUrl = getSiteUrl();

  const staticRoutes = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
    alternates: {
      languages: {
        es: `${siteUrl}${route}`,
        ca: `${siteUrl}/ca${route}`,
      },
    },
  }));

  return staticRoutes;
}
