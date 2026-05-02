import type { MetadataRoute } from "next";
import { headers } from "next/headers";

const STAGING_HOST = process.env.STAGING_HOST || "app.perebarcelopsicologo.com";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isStaging = host.includes(STAGING_HOST);

  if (isStaging) {
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
    sitemap: "https://perebarcelopsicologo.com/sitemap.xml",
  };
}
