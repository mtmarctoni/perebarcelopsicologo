import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { buildHeaders } from "./config/headers";
import { buildRedirects } from "./config/redirects";
import { configureSvgLoader, turbopackSvgRule } from "./config/svg";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  webpack: configureSvgLoader,
  turbopack: turbopackSvgRule,
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
    return buildHeaders();
  },
  async redirects() {
    return buildRedirects();
  },
  basePath: "",
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
