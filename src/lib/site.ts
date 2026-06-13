export type Environment = "production" | "staging" | "preview" | "development";

const PRODUCTION_HOST = "perebarcelopsicologo.com";

function getEnvironment(): Environment {
  if (process.env.APP_ENV === "production") return "production";
  if (process.env.APP_ENV === "staging") return "staging";
  if (process.env.APP_ENV === "preview") return "preview";
  if (process.env.APP_ENV === "development") return "development";

  if (process.env.VERCEL_ENV === "preview") return "preview";

  if (process.env.VERCEL_ENV === "production") {
    const vercelUrl = process.env.VERCEL_URL || "";
    if (vercelUrl.startsWith("app.") || vercelUrl.includes("staging")) {
      return "staging";
    }
    return "production";
  }

  return "development";
}

export function isProduction(): boolean {
  return getEnvironment() === "production";
}

export function getSiteUrl(): string {
  return `https://${PRODUCTION_HOST}`;
}

export function getRobotsMetadata() {
  const production = isProduction();
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
