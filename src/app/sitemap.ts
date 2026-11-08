import type { MetadataRoute } from "next";
import { pageRoutes } from "@/config/routes";
import { getLocalizedPageUrl, getPageAlternates } from "@/lib/seo-urls";
import { getCanonicalUrl, isProduction } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProduction()) {
    return [];
  }

  const canonicalUrl = getCanonicalUrl();

  return pageRoutes
    .filter((route) => route.indexable)
    .flatMap(({ path }) =>
      ["es", "ca"].map((locale) => ({
        url: getLocalizedPageUrl(canonicalUrl, path, locale),
        alternates: { languages: getPageAlternates(canonicalUrl, path) },
      })),
    );
}
