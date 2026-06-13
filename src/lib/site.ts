import type { Metadata } from "next";

export type Environment = "production" | "staging" | "preview" | "development";

const PRODUCTION_HOST = "perebarcelopsicologo.com";

export function getEnvironment(): Environment {
  // VERCEL_ENV takes precedence over APP_ENV when both are present.
  // This prevents an accidental APP_ENV=production from exposing a Vercel preview.
  if (process.env.VERCEL_ENV) {
    if (process.env.VERCEL_ENV === "production") {
      const vercelUrl = process.env.VERCEL_URL || "";
      if (vercelUrl.startsWith("app.")) {
        return "staging";
      }
      return "production";
    }
    if (process.env.VERCEL_ENV === "preview") return "preview";
    return "development";
  }

  if (process.env.APP_ENV === "production") return "production";
  if (process.env.APP_ENV === "staging") return "staging";
  if (process.env.APP_ENV === "preview") return "preview";
  if (process.env.APP_ENV === "development") return "development";

  return "development";
}

export function isProduction(): boolean {
  return getEnvironment() === "production";
}

export function getSiteUrl(): string {
  return `https://${PRODUCTION_HOST}`;
}

export function getRobotsMetadata(): Metadata["robots"] {
  const production = isProduction();
  return {
    index: production,
    follow: production,
    ...(production && {
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    }),
  };
}
