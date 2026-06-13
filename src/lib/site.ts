/**
 * Environment detection and site URL utilities
 *
 * Production: perebarcelopsicologo.com
 * Staging:    app.perebarcelopsicologo.com (develop branch)
 * Preview:    *.vercel.app (PR deployments)
 * Development: localhost
 */

export type Environment = "production" | "staging" | "preview" | "development";

const PRODUCTION_HOST = "perebarcelopsicologo.com";
const STAGING_HOST = process.env.STAGING_HOST || "app.perebarcelopsicologo.com";

export function getEnvironment(host?: string): Environment {
  // Vercel preview deployments
  if (process.env.VERCEL_ENV === "preview") {
    return "preview";
  }

  // Vercel production deployments — need to verify it's not staging
  if (process.env.VERCEL_ENV === "production") {
    const vercelUrl = process.env.VERCEL_URL || "";
    if (vercelUrl.includes("app.") || vercelUrl.includes("staging")) {
      return "staging";
    }
    // If host is explicitly staging, trust it
    if (host?.includes(STAGING_HOST)) {
      return "staging";
    }
    return "production";
  }

  // Fallback: check request host
  if (host) {
    if (host.includes(PRODUCTION_HOST) && !host.includes("app.")) {
      return "production";
    }
    if (host.includes(STAGING_HOST)) {
      return "staging";
    }
  }

  return "development";
}

export function isProduction(host?: string): boolean {
  return getEnvironment(host) === "production";
}

export function isIndexable(host?: string): boolean {
  return isProduction(host);
}

export function getSiteUrl(host?: string): string {
  const env = getEnvironment(host);

  switch (env) {
    case "production":
      return `https://${PRODUCTION_HOST}`;
    case "staging":
      return `https://${STAGING_HOST}`;
    case "preview": {
      const previewUrl = process.env.VERCEL_URL;
      return previewUrl ? `https://${previewUrl}` : `https://${PRODUCTION_HOST}`;
    }
    default: {
      const resolvedHost = host || "localhost:3000";
      const protocol = resolvedHost.startsWith("localhost") ? "http" : "https";
      return `${protocol}://${resolvedHost}`;
    }
  }
}

export function getCanonicalUrl(path: string, host?: string): string {
  const siteUrl = getSiteUrl(host);
  const cleanPath = path === "/" ? "" : path;
  return `${siteUrl}${cleanPath}`;
}

export function getRobotsMetadata(host?: string): { index: boolean; follow: boolean } {
  return {
    index: isProduction(host),
    follow: true,
  };
}
