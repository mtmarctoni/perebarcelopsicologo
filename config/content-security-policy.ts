/**
 * Build the Content-Security-Policy header.
 *
 * Origins are grouped by service so you can see at a glance which URLs
 * each third party needs. Scroll to `services` below.
 *
 * ## Nonce mode (production)
 * A per-request nonce is injected via middleware. Next.js reads the nonce
 * from the CSP response header and auto-applies it to every inline script
 * it injects (hydration, flight data). `'strict-dynamic'` lets nonce'd scripts load their own
 * scripts transitively, so GTM can bootstrap without listing every child
 * script origin.
 *
 * ## Dev mode
 * Next.js dev server needs `'unsafe-eval'` (HMR/source maps) and
 * `'unsafe-inline'` (quick eval). The nonce is skipped — dev is permissive.
 *
 * Vercel injects its Live Feedback toolbar on preview/dev deployments only.
 * We allow those origins outside production so the toolbar doesn't trip the
 * CSP and pollute the console (which fails Lighthouse best-practices).
 */

export type CspOptions = {
  /** Per-request nonce (base64). Required for production; skipped when isDev. */
  nonce?: string;
  /** True in local development (NODE_ENV=development). */
  isDev?: boolean;
};

// CSP token constants — typo-proof.
const SELF = "'self'" as const;
const NONE = "'none'" as const;
const UNSAFE_INLINE = "'unsafe-inline'" as const;
const UNSAFE_EVAL = "'unsafe-eval'" as const;
const STRICT_DYNAMIC = "'strict-dynamic'" as const;

type DirectiveKey = "script" | "style" | "img" | "font" | "connect" | "frame";

type ServiceOrigins = Partial<Record<DirectiveKey, string[]>>;

const services: Record<string, ServiceOrigins> = {
  gtm: {
    script: ["https://www.googletagmanager.com"],
    style: ["https://www.googletagmanager.com", "https://fonts.googleapis.com"],
    img: ["https://www.googletagmanager.com", "https://fonts.gstatic.com"],
    connect: ["https://www.googletagmanager.com"],
    frame: ["https://www.googletagmanager.com"],
  },
  ga4: {
    script: [
      "https://www.googletag.com",
      "https://www.google-analytics.com",
      "https://ssl.google-analytics.com",
    ],
    img: [
      "https://www.googletag.com",
      "https://www.google-analytics.com",
      "https://ssl.google-analytics.com",
    ],
    connect: ["https://www.googletag.com", "https://*.google-analytics.com"],
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

export function buildContentSecurityPolicy({ nonce, isDev = false }: CspOptions = {}): string {
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

  // script-src: strict with nonce in prod, permissive in dev.
  const scriptSrc = isDev
    ? [SELF, UNSAFE_INLINE, UNSAFE_EVAL, ...collect("script"), ...(vercelLive.script ?? [])]
    : [
        SELF,
        `'nonce-${nonce}'`,
        STRICT_DYNAMIC,
        ...collect("script"),
        ...(vercelLive.script ?? []),
      ];

  // style-src: always 'unsafe-inline' — Next.js injects inline styles
  // (next/font, styled-jsx, Tailwind utilities). Noncing styles is fragile
  // and the XSS risk of inline CSS is far lower than inline JS.
  const styleSrc = [SELF, UNSAFE_INLINE, ...collect("style"), ...(vercelLive.style ?? [])];

  const directives: Record<string, string[]> = {
    "default-src": [SELF],
    "script-src": scriptSrc,
    "style-src": styleSrc,
    "img-src": [SELF, "data:", "blob:", ...collect("img"), ...(vercelLive.img ?? [])],
    "font-src": [SELF, ...(vercelLive.font ?? [])],
    "connect-src": [SELF, ...collect("connect"), ...(vercelLive.connect ?? [])],
    "frame-src": [SELF, ...collect("frame"), ...(vercelLive.frame ?? [])],
    "frame-ancestors": [NONE],
    "base-uri": [SELF],
    "form-action": [SELF],
    "object-src": [NONE],
  };

  return Object.entries(directives)
    .map(([directive, values]) => `${directive} ${values.join(" ")}`)
    .join("; ");
}
