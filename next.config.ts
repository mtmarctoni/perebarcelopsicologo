import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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
