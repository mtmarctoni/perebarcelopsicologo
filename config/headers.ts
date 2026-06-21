import type { Header } from "next/dist/lib/load-custom-routes";
import { buildContentSecurityPolicy } from "./content-security-policy";

export function buildHeaders(): Header[] {
  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains; preload",
        },
        {
          key: "Content-Security-Policy",
          value: buildContentSecurityPolicy(),
        },
      ],
    },
    {
      source:
        "/(favicon.ico|favicon-16x16.png|favicon-32x32.png|apple-touch-icon.png|icon-192x192.png|icon-512x512.png|site.webmanifest)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, stale-while-revalidate=86400",
        },
      ],
    },
    {
      source: "/(stock|profile|clubs|wp)/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, stale-while-revalidate=86400",
        },
      ],
    },
  ];
}
