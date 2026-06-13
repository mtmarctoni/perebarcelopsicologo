import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { getSiteUrl, isProduction } from "@/lib/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  if (!isProduction(host)) {
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
    sitemap: `${getSiteUrl(host)}/sitemap.xml`,
  };
}
