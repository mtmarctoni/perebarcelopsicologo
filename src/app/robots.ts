import type { MetadataRoute } from "next";
import { headers } from "next/headers";

const STAGING_HOST = process.env.STAGING_HOST || "app.perebarcelopsicologo.com";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const hostHeader = headersList.get("host") || "";
  const normalizedHost = hostHeader.trim().toLowerCase().split(":")[0];
  const normalizedStagingHost = STAGING_HOST.trim().toLowerCase();
  const isStaging = normalizedHost === normalizedStagingHost;

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
