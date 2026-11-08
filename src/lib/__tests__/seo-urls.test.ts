import { describe, expect, it } from "vitest";
import { getLocalizedPageUrl, getPageAlternates } from "@/lib/seo-urls";

describe("SEO URL normalization", () => {
  it("normalizes root and subpage trailing slashes for either locale", () => {
    const base = "https://perebarcelopsicologo.com/";
    expect(getLocalizedPageUrl(base, "/", "es")).toBe("https://perebarcelopsicologo.com");
    expect(getLocalizedPageUrl(base, "/", "ca")).toBe("https://perebarcelopsicologo.com/ca");
    expect(getLocalizedPageUrl(base, "/about/", "ca")).toBe(
      "https://perebarcelopsicologo.com/ca/about",
    );
    expect(getPageAlternates(base, "/about/")).toEqual({
      "x-default": "https://perebarcelopsicologo.com/about",
      es: "https://perebarcelopsicologo.com/about",
      ca: "https://perebarcelopsicologo.com/ca/about",
    });
  });
});
