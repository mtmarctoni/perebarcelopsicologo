import { describe, expect, it, vi } from "vitest";

vi.mock("@/config/server-env.config", () => ({
  serverEnv: { GOOGLE_SITE_VERIFICATION: undefined },
}));

vi.mock("@/lib/site", () => ({
  getCanonicalUrl: vi.fn().mockReturnValue("https://perebarcelopsicologo.com"),
  getSiteUrl: vi.fn().mockReturnValue("https://perebarcelopsicologo.com"),
  getRobotsMetadata: vi.fn().mockReturnValue({
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }),
}));

import { createPageMetadata, defaultMetadata } from "@/app/metadata";

describe("defaultMetadata", () => {
  it("has a metadataBase as URL", () => {
    expect(defaultMetadata.metadataBase).toBeInstanceOf(URL);
    expect((defaultMetadata.metadataBase as URL).href).toBe("https://perebarcelopsicologo.com/");
  });

  it("has a title and description", () => {
    expect(defaultMetadata.title).toBeTruthy();
    expect(defaultMetadata.description).toBeTruthy();
  });

  it("has openGraph configured", () => {
    const og = defaultMetadata.openGraph as Record<string, unknown>;
    expect(og.type).toBe("website");
    expect(og.locale).toBe("es_ES");
    expect(og.siteName).toBeTruthy();
    expect(og.images).toHaveLength(1);
  });

  it("has twitter card configured", () => {
    const tw = defaultMetadata.twitter as Record<string, unknown>;
    expect(tw.card).toBe("summary_large_image");
    expect(tw.title).toBeTruthy();
    expect(tw.description).toBeTruthy();
    expect(tw.creator).toBe("@PBarceloPsico");
  });

  it("has alternates with canonical and hreflang", () => {
    expect(defaultMetadata.alternates?.canonical).toBe("https://perebarcelopsicologo.com");
    expect(defaultMetadata.alternates?.languages?.["x-default"]).toBe(
      "https://perebarcelopsicologo.com/",
    );
    expect(defaultMetadata.alternates?.languages?.es).toBe("https://perebarcelopsicologo.com/");
    expect(defaultMetadata.alternates?.languages?.ca).toBe("https://perebarcelopsicologo.com/ca/");
  });

  it("has robots allowing indexing", () => {
    expect(defaultMetadata.robots).toEqual({
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    });
  });
});

describe("createPageMetadata", () => {
  it("returns correct canonical for root path", () => {
    const meta = createPageMetadata({
      title: "Home",
      description: "Home desc",
      path: "/",
      locale: "es",
    });
    expect(meta.alternates?.canonical).toBe("https://perebarcelopsicologo.com");
  });

  it("returns correct canonical for sub-pages", () => {
    const meta = createPageMetadata({
      title: "About",
      description: "About desc",
      path: "/about",
      locale: "es",
    });
    expect(meta.alternates?.canonical).toBe("https://perebarcelopsicologo.com/about");
  });

  it("sets correct hreflang for Spanish locale", () => {
    const meta = createPageMetadata({
      title: "About",
      description: "About desc",
      path: "/about",
      locale: "es",
    });
    expect(meta.alternates?.languages).toEqual({
      "x-default": "https://perebarcelopsicologo.com/about",
      es: "https://perebarcelopsicologo.com/about",
      ca: "https://perebarcelopsicologo.com/ca/about",
    });
  });

  it("sets correct hreflang for Catalan locale", () => {
    const meta = createPageMetadata({
      title: "Sobre mi",
      description: "Sobre mi desc",
      path: "/about",
      locale: "ca",
    });
    expect(meta.alternates?.languages).toEqual({
      "x-default": "https://perebarcelopsicologo.com/about",
      es: "https://perebarcelopsicologo.com/about",
      ca: "https://perebarcelopsicologo.com/ca/about",
    });
  });

  it("sets openGraph locale to ca_ES for Catalan", () => {
    const meta = createPageMetadata({
      title: "Sobre mi",
      description: "Desc",
      path: "/about",
      locale: "ca",
    });
    expect(meta.openGraph?.locale).toBe("ca_ES");
  });

  it("sets openGraph locale to es_ES for Spanish", () => {
    const meta = createPageMetadata({
      title: "Sobre mí",
      description: "Desc",
      path: "/about",
      locale: "es",
    });
    expect(meta.openGraph?.locale).toBe("es_ES");
  });

  it("sets openGraph URL to canonical", () => {
    const meta = createPageMetadata({
      title: "Servicios",
      description: "Desc",
      path: "/servicios",
      locale: "es",
    });
    expect(meta.openGraph?.url).toBe("https://perebarcelopsicologo.com/servicios");
  });

  it("overrides title and description", () => {
    const meta = createPageMetadata({
      title: "Custom Title",
      description: "Custom Description",
      path: "/",
      locale: "es",
    });
    expect(meta.title).toBe("Custom Title");
    expect(meta.description).toBe("Custom Description");
  });

  it("generates correct Catalan canonical for root", () => {
    const meta = createPageMetadata({
      title: "Inici",
      description: "Desc",
      path: "/",
      locale: "ca",
    });
    expect(meta.alternates?.canonical).toBe("https://perebarcelopsicologo.com/ca/");
    expect(meta.alternates?.languages?.ca).toBe("https://perebarcelopsicologo.com/ca/");
  });

  it("has OG images array", () => {
    const meta = createPageMetadata({
      title: "Test",
      description: "Desc",
      path: "/test",
      locale: "es",
    });
    expect(meta.openGraph?.images).toHaveLength(1);
    const img = (
      meta.openGraph?.images as Array<{ url: string; width: number; height: number }>
    )[0];
    expect(img).toHaveProperty("url");
    expect(img).toHaveProperty("width", 1200);
    expect(img).toHaveProperty("height", 630);
  });
});
