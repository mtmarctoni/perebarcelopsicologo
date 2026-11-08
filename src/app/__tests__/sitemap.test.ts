import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/site", () => ({
  isProduction: vi.fn(),
  getCanonicalUrl: vi.fn().mockReturnValue("https://perebarcelopsicologo.com"),
  getRobotsMetadata: vi.fn().mockReturnValue({ index: true, follow: true }),
}));

vi.mock("@/config/server-env.config", () => ({ serverEnv: {} }));

import { createPageMetadata } from "@/app/metadata";
import sitemap from "@/app/sitemap";
import { getCanonicalUrl, isProduction } from "@/lib/site";

describe("sitemap.xml", () => {
  it("lists every indexable locale URL exactly once, excluding privacy", () => {
    vi.mocked(isProduction).mockReturnValue(true);
    vi.mocked(getCanonicalUrl).mockReturnValue("https://perebarcelopsicologo.com");
    expect(
      sitemap()
        .map((entry) => entry.url)
        .sort(),
    ).toEqual([
      "https://perebarcelopsicologo.com",
      "https://perebarcelopsicologo.com/about",
      "https://perebarcelopsicologo.com/ca",
      "https://perebarcelopsicologo.com/ca/about",
      "https://perebarcelopsicologo.com/ca/contact",
      "https://perebarcelopsicologo.com/ca/servicios",
      "https://perebarcelopsicologo.com/contact",
      "https://perebarcelopsicologo.com/servicios",
    ]);
  });

  it.each(["", "/about", "/contact", "/servicios"])("has reciprocal alternates for %s", (path) => {
    vi.mocked(isProduction).mockReturnValue(true);
    vi.mocked(getCanonicalUrl).mockReturnValue("https://perebarcelopsicologo.com");
    const es = `https://perebarcelopsicologo.com${path}`;
    const ca = `https://perebarcelopsicologo.com/ca${path}`;
    for (const url of [es, ca]) {
      expect(sitemap().find((entry) => entry.url === url)?.alternates?.languages).toEqual({
        "x-default": es,
        es,
        ca,
      });
    }
  });

  it("omits unverified modification dates and ignored crawl hints", () => {
    vi.mocked(isProduction).mockReturnValue(true);
    vi.mocked(getCanonicalUrl).mockReturnValue("https://perebarcelopsicologo.com");
    for (const entry of sitemap()) {
      expect(entry.lastModified).toBeUndefined();
      expect(entry.priority).toBeUndefined();
      expect(entry.changeFrequency).toBeUndefined();
    }
  });

  it("returns no URLs outside production", () => {
    vi.mocked(isProduction).mockReturnValue(false);
    expect(sitemap()).toEqual([]);
  });

  it("has reciprocal alternates with matching canonical sitemap entries", () => {
    vi.mocked(isProduction).mockReturnValue(true);
    vi.mocked(getCanonicalUrl).mockReturnValue("https://perebarcelopsicologo.com");
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.lastModified).toBeUndefined();
      for (const locale of ["es", "ca"] as const) {
        const url = entry.alternates?.languages?.[locale];
        const alternate = entries.find((candidate) => candidate.url === url);
        expect(alternate?.alternates).toEqual(entry.alternates);
      }
    }
    for (const path of ["/", "/about", "/contact", "/servicios"]) {
      for (const locale of ["es", "ca"]) {
        const metadata = createPageMetadata({ title: "Test", description: "Test", path, locale });
        const entry = entries.find((candidate) => candidate.url === metadata.alternates?.canonical);
        expect(entry).toBeDefined();
        expect(entry?.alternates?.languages).toEqual(metadata.alternates?.languages);
      }
    }
  });
});
