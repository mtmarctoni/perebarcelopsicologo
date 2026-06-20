import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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
function buildContentSecurityPolicy(): string {
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

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: RegExp }) => rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  // Turbopack configuration
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  // Other Next.js configurations
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "perebarcelopsicologo.com",
      },
      {
        protocol: "https",
        hostname: "app.perebarcelopsicologo.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
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
          {
            key: "Content-Security-Policy",
            value: buildContentSecurityPolicy(),
          },
        ],
      },
      // Cache static assets with immutable hashes for 1 year
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache static images for 1 year
      {
        source: "/(favicon.ico|favicon-16x16.png|favicon-32x32.png|apple-touch-icon.png|icon-192x192.png|icon-512x512.png|site.webmanifest)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache static images for 1 year
      {
        source: "/(stock|profile|clubs|wp)/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/methodology",
        destination: "/",
        permanent: true,
      },
      {
        source: "/methodology/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/performance",
        destination: "/",
        permanent: true,
      },
      {
        source: "/performance/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/mental",
        destination: "/",
        permanent: true,
      },
      {
        source: "/mental/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  basePath: "",
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
