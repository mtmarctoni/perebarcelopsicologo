import type { MetadataRoute } from "next";

import { getCanonicalUrl, isProduction } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${getCanonicalUrl()}/sitemap.xml`,
  };
}
