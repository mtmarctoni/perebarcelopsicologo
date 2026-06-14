import type { MetadataRoute } from "next";

import { getSiteUrl, isProduction } from "@/lib/site";

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
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
