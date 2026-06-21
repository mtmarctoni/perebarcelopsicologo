import type { Redirect } from "next/dist/lib/load-custom-routes";

export function buildRedirects(): Redirect[] {
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
}
