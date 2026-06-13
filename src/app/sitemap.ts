import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { getSiteUrl, isProduction } from "@/lib/site";

const routes = ["", "/about", "/contact", "/privacy", "/servicios"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host") || undefined;

  if (!isProduction(host)) {
    return [];
  }

  const siteUrl = getSiteUrl(host);

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
