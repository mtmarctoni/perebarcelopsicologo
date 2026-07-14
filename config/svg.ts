import type { NextConfig } from "next";

type WebpackConfig = Parameters<NonNullable<NextConfig["webpack"]>>[0];

export function configureSvgLoader(config: WebpackConfig) {
  const fileLoaderRule = config.module.rules.find((rule: { test?: RegExp }) =>
    rule.test?.test?.(".svg"),
  );

  if (!fileLoaderRule) {
    return config;
  }

  config.module.rules.push(
    {
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/,
    },
    {
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      resourceQuery: {
        not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
      },
      use: ["@svgr/webpack"],
    },
  );

  fileLoaderRule.exclude = /\.svg$/i;

  return config;
}

export const turbopackSvgRule: NextConfig["turbopack"] = {
  rules: {
    "*.svg": {
      loaders: ["@svgr/webpack"],
      as: "*.js",
    },
  },
};
