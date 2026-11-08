import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/config/routes";
import { getLocalizedPageUrl, getPageAlternates } from "@/lib/seo-urls";
import { getCanonicalUrl, isProduction } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProduction()) {
    return [];
  }

  const canonicalUrl = getCanonicalUrl();

  const staticRoutes = sitemapRoutes.flatMap((route) =>
    ["es", "ca"].map((locale) => ({
      url: getLocalizedPageUrl(canonicalUrl, route, locale),
      // Omit lastModified until actual per-page content modification dates are maintained.
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: getPageAlternates(canonicalUrl, route),
      },
    })),
  );

  return staticRoutes;
}
