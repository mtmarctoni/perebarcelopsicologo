import type { MetadataRoute } from "next";

const siteUrl = "https://perebarcelopsicologo.com";
const routes = ["", "/about", "/servicios", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const defaultEntries = routes.map((route) => ({
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

  return defaultEntries;
}
