/**
 * Build the Content-Security-Policy header.
 *
 * Origins are grouped by service so you can see at a glance which URLs
 * each third party needs. Scroll to `services` below.
 *
 * Vercel injects its Live Feedback toolbar (https://vercel.live/.../feedback.js
 * plus a Pusher websocket and a few asset origins) on preview and development
 * deployments only — never on production. Allow those origins outside
 * production so the toolbar doesn't trip the CSP and pollute the console
 * (which fails Lighthouse best-practices audits), while keeping the production
 * policy locked down.
 */

type DirectiveKey = "script" | "style" | "img" | "font" | "connect" | "frame";

type ServiceOrigins = Partial<Record<DirectiveKey, string[]>>;

const services: Record<string, ServiceOrigins> = {
  cookiebot: {
    script: ["https://consent.cookiebot.com"],
    style: ["https://consent.cookiebot.com"],
    img: ["https://*.cookiebot.com"],
    connect: ["https://consent.cookiebot.com"],
    frame: ["https://consent.cookiebot.com"],
  },
  gtm: {
    script: ["https://www.googletagmanager.com"],
    img: ["https://www.googletagmanager.com"],
    connect: ["https://www.googletagmanager.com"],
    frame: ["https://www.googletagmanager.com"],
  },
  ga4: {
    script: ["https://www.google-analytics.com", "https://ssl.google-analytics.com"],
    img: ["https://www.google-analytics.com", "https://ssl.google-analytics.com"],
    connect: ["https://*.google-analytics.com"],
    frame: ["https://www.google-analytics.com"],
  },
  googleAds: {
    script: ["https://www.googleadservices.com", "https://googleads.g.doubleclick.net"],
    img: [
      "https://www.googleadservices.com",
      "https://googleads.g.doubleclick.net",
      "https://www.google.com",
    ],
    connect: ["https://googleads.g.doubleclick.net"],
    frame: [
      "https://www.googleadservices.com",
      "https://googleads.g.doubleclick.net",
      "https://www.google.com",
    ],
  },
  calendly: {
    img: ["https://*.calendly.com"],
    connect: ["https://*.calendly.com"],
    frame: ["https://calendly.com", "https://*.calendly.com"],
  },
  resend: {
    connect: ["https://*.resend.com"],
  },
  vercelInsights: {
    connect: ["https://vitals.vercel-insights.com"],
  },
};

function collect(directive: DirectiveKey): string[] {
  return Object.values(services).flatMap((s) => s[directive] ?? []);
}

export function buildContentSecurityPolicy(): string {
  const allowVercelLive = process.env.VERCEL_ENV !== "production";

  const vercelLive: ServiceOrigins = {
    script: allowVercelLive ? ["https://vercel.live"] : [],
    style: allowVercelLive ? ["https://vercel.live"] : [],
    img: allowVercelLive ? ["https://vercel.live", "https://vercel.com"] : [],
    font: allowVercelLive ? ["https://vercel.live", "https://assets.vercel.com"] : [],
    connect: allowVercelLive
      ? ["https://vercel.live", "wss://ws-us3.pusher.com", "https://*.pusher.com"]
      : [],
    frame: allowVercelLive ? ["https://vercel.live"] : [],
  };

  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-eval'",
      "'unsafe-inline'",
      ...collect("script"),
      ...(vercelLive.script ?? []),
    ],
    "style-src": ["'self'", "'unsafe-inline'", ...collect("style"), ...(vercelLive.style ?? [])],
    "img-src": ["'self'", "data:", "blob:", ...collect("img"), ...(vercelLive.img ?? [])],
    "font-src": ["'self'", ...(vercelLive.font ?? [])],
    "connect-src": ["'self'", ...collect("connect"), ...(vercelLive.connect ?? [])],
    "frame-src": ["'self'", ...collect("frame"), ...(vercelLive.frame ?? [])],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "object-src": ["'none'"],
  };

  return Object.entries(directives)
    .map(([directive, values]) => `${directive} ${values.join(" ")}`)
    .join("; ");
}
