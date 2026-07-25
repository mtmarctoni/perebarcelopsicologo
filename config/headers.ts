import type { Header } from "next/dist/lib/load-custom-routes";
import { buildContentSecurityPolicy, cspReportOnly } from "./content-security-policy";

const CSP_HEADER_NAME = cspReportOnly
  ? "Content-Security-Policy-Report-Only"
  : "Content-Security-Policy";

export function buildHeaders(): Header[] {
  const isDev = process.env.NODE_ENV === "development";

  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: CSP_HEADER_NAME,
          value: buildContentSecurityPolicy({ isDev }),
        },
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
