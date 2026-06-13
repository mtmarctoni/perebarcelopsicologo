export type Environment = "production" | "staging" | "preview" | "development";

const PRODUCTION_HOST = "perebarcelopsicologo.com";
const STAGING_HOST = process.env.STAGING_HOST || "app.perebarcelopsicologo.com";

function matchHost(host: string | undefined, target: string): boolean {
  if (!host) return false;
  const hostname = host.split(":")[0];
  return hostname === target || hostname.endsWith(`.${target}`);
}

function getEnvironment(host?: string): Environment {
  // Explicit APP_ENV takes precedence over all detection
  if (process.env.APP_ENV === "production") return "production";
  if (process.env.APP_ENV === "staging") return "staging";
  if (process.env.APP_ENV === "preview") return "preview";
  if (process.env.APP_ENV === "development") return "development";

  if (process.env.VERCEL_ENV === "preview") {
    return "preview";
  }

  if (process.env.VERCEL_ENV === "production") {
    const vercelUrl = process.env.VERCEL_URL || "";
    if (vercelUrl.startsWith("app.") || vercelUrl.includes("staging")) {
      return "staging";
    }
    if (matchHost(host, STAGING_HOST)) {
      return "staging";
    }
    return "production";
  }

  if (host) {
    if (matchHost(host, PRODUCTION_HOST) && !host.startsWith("app.")) {
      return "production";
    }
    if (matchHost(host, STAGING_HOST)) {
      return "staging";
    }
  }

  return "development";
}

export function isProduction(host?: string): boolean {
  return getEnvironment(host) === "production";
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

export function getRobotsMetadata(host?: string) {
  const production = isProduction(host);
  return {
    index: production,
    follow: true,
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
