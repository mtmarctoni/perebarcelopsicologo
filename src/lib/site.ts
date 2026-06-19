import type { Metadata } from "next";

const Env = {
  Production: "production",
  Staging: "staging",
  Preview: "preview",
  Development: "development",
} as const;

type Environment = (typeof Env)[keyof typeof Env];

const PRODUCTION_HOST = "perebarcelopsicologo.com";
const STAGING_URL_PREFIX = "app.";

export function getEnvironment(): Environment {
  if (process.env.VERCEL_ENV) {
    if (process.env.VERCEL_ENV === Env.Production) {
      const vercelUrl = process.env.VERCEL_URL || "";
      if (vercelUrl.startsWith(STAGING_URL_PREFIX)) {
        return Env.Staging;
      }
      return Env.Production;
    }
    if (process.env.VERCEL_ENV === Env.Preview) return Env.Preview;
    return Env.Development;
  }

  if (process.env.APP_ENV === Env.Production) return Env.Production;
  if (process.env.APP_ENV === Env.Staging) return Env.Staging;
  if (process.env.APP_ENV === Env.Preview) return Env.Preview;
  if (process.env.APP_ENV === Env.Development) return Env.Development;

  return Env.Development;
}

export function isProduction(): boolean {
  return getEnvironment() === Env.Production;
}

export function getSiteUrl(): string {
  return process.env.SITE_URL || `https://${PRODUCTION_HOST}`;
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
