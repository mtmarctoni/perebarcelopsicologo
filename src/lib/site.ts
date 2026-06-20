import type { Metadata } from "next";

const Env = {
  Production: "production",
  Staging: "staging",
  Preview: "preview",
  Development: "development",
} as const;

type Environment = (typeof Env)[keyof typeof Env];

const PRODUCTION_HOST = "perebarcelopsicologo.com";
const STAGING_HOST = "app.perebarcelopsicologo.com";
const STAGING_URL_PREFIX = "app.";
const DEVELOP_BRANCH = "develop";

export function getEnvironment(): Environment {
  if (process.env.VERCEL_ENV) {
    if (process.env.VERCEL_ENV === Env.Production) {
      const vercelUrl = process.env.VERCEL_URL || "";
      if (vercelUrl.startsWith(STAGING_URL_PREFIX)) {
        return Env.Staging;
      }
      return Env.Production;
    }
    if (process.env.VERCEL_ENV === Env.Preview) {
      // Detect staging by branch name on Vercel preview deployments
      const branch = process.env.VERCEL_GIT_COMMIT_REF || "";
      if (branch === DEVELOP_BRANCH) {
        return Env.Staging;
      }
      return Env.Preview;
    }
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

export function isStaging(): boolean {
  return getEnvironment() === Env.Staging;
}

export function isIndexable(): boolean {
  return isProduction();
}

export function getSiteUrl(): string {
  return process.env.SITE_URL || `https://${PRODUCTION_HOST}`;
}

/**
 * Returns the canonical URL for the current environment.
 *
 * Strategy:
 * - Production: canonical = production domain
 * - Staging (develop branch): canonical = staging domain
 * - Other preview branches: canonical = production domain (prevents
 *   duplicate content from random Vercel preview URLs)
 */
export function getCanonicalUrl(): string {
  if (isStaging()) {
    return `https://${STAGING_HOST}`;
  }
  return getSiteUrl();
}

export function getRobotsMetadata(): Metadata["robots"] {
  const indexable = isIndexable();
  return {
    index: indexable,
    follow: indexable,
    ...(indexable && {
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
