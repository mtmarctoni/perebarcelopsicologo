/**
 * Build the Content-Security-Policy header.
 *
 * Vercel injects its Live Feedback toolbar (https://vercel.live/.../feedback.js
 * plus a Pusher websocket and a few asset origins) on preview and development
 * deployments only — never on production. Allow those origins outside
 * production so the toolbar doesn't trip the CSP and pollute the console
 * (which fails Lighthouse best-practices audits), while keeping the production
 * policy locked down.
 */
export function buildContentSecurityPolicy(): string {
  const allowVercelLive = process.env.VERCEL_ENV !== "production";

  const vercelLive = {
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
      "https://consent.cookiebot.com",
      "https://www.googletagmanager.com",
      "https://ssl.google-analytics.com",
      ...vercelLive.script,
    ],
    "style-src": ["'self'", "'unsafe-inline'", ...vercelLive.style],
    "img-src": ["'self'", "data:", "blob:", "https://*.calendly.com", ...vercelLive.img],
    "font-src": ["'self'", ...vercelLive.font],
    "connect-src": [
      "'self'",
      "https://*.resend.com",
      "https://vitals.vercel-insights.com",
      "https://consent.cookiebot.com",
      "https://www.google-analytics.com",
      ...vercelLive.connect,
    ],
    "frame-src": [
      "'self'",
      "https://calendly.com",
      "https://consent.cookiebot.com",
      ...vercelLive.frame,
    ],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "object-src": ["'none'"],
  };

  return Object.entries(directives)
    .map(([directive, values]) => `${directive} ${values.join(" ")}`)
    .join("; ");
}
