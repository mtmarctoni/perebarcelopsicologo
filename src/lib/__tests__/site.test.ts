import { beforeEach, describe, expect, it } from "vitest";
import { getEnvironment, getRobotsMetadata, getSiteUrl, isProduction } from "../site";

describe("getEnvironment", () => {
  beforeEach(() => {
    delete process.env.VERCEL_ENV;
    delete process.env.VERCEL_URL;
    delete process.env.APP_ENV;
  });

  it('returns "development" when no env vars are set', () => {
    expect(getEnvironment()).toBe("development");
  });

  it('returns "production" when VERCEL_ENV=production (standard domain)', () => {
    process.env.VERCEL_ENV = "production";
    process.env.VERCEL_URL = "perebarcelopsicologo.com";
    expect(getEnvironment()).toBe("production");
  });

  it('returns "staging" when VERCEL_ENV=production with app. prefix', () => {
    process.env.VERCEL_ENV = "production";
    process.env.VERCEL_URL = "app.perebarcelopsicologo.com";
    expect(getEnvironment()).toBe("staging");
  });

  it('returns "preview" when VERCEL_ENV=preview', () => {
    process.env.VERCEL_ENV = "preview";
    expect(getEnvironment()).toBe("preview");
  });

  it('returns "development" when VERCEL_ENV=development', () => {
    process.env.VERCEL_ENV = "development";
    expect(getEnvironment()).toBe("development");
  });

  it("uses APP_ENV fallback when VERCEL_ENV is not set", () => {
    process.env.APP_ENV = "production";
    expect(getEnvironment()).toBe("production");
  });
});

describe("isProduction", () => {
  beforeEach(() => {
    delete process.env.VERCEL_ENV;
    delete process.env.VERCEL_URL;
    delete process.env.APP_ENV;
  });

  it("returns true for production env", () => {
    process.env.VERCEL_ENV = "production";
    process.env.VERCEL_URL = "perebarcelopsicologo.com";
    expect(isProduction()).toBe(true);
  });

  it("returns false for staging (app. prefix)", () => {
    process.env.VERCEL_ENV = "production";
    process.env.VERCEL_URL = "app.perebarcelopsicologo.com";
    expect(isProduction()).toBe(false);
  });

  it("returns false for preview", () => {
    process.env.VERCEL_ENV = "preview";
    expect(isProduction()).toBe(false);
  });

  it("returns false for development", () => {
    expect(isProduction()).toBe(false);
  });
});

describe("getRobotsMetadata", () => {
  beforeEach(() => {
    delete process.env.VERCEL_ENV;
    delete process.env.VERCEL_URL;
    delete process.env.APP_ENV;
  });

  it("allows indexing and following on production", () => {
    process.env.VERCEL_ENV = "production";
    process.env.VERCEL_URL = "perebarcelopsicologo.com";
    const meta = getRobotsMetadata();
    expect(meta).toEqual({
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

  it("blocks indexing and following on staging", () => {
    process.env.VERCEL_ENV = "production";
    process.env.VERCEL_URL = "app.perebarcelopsicologo.com";
    const meta = getRobotsMetadata();
    expect(meta).toEqual({ index: false, follow: false });
  });

  it("blocks indexing and following on preview", () => {
    process.env.VERCEL_ENV = "preview";
    const meta = getRobotsMetadata();
    expect(meta).toEqual({ index: false, follow: false });
  });

  it("blocks indexing and following on development", () => {
    const meta = getRobotsMetadata();
    expect(meta).toEqual({ index: false, follow: false });
  });
});

describe("getSiteUrl", () => {
  beforeEach(() => {
    delete process.env.SITE_URL;
  });

  it("returns SITE_URL when set", () => {
    process.env.SITE_URL = "https://example.com";
    expect(getSiteUrl()).toBe("https://example.com");
  });

  it("returns default production URL when SITE_URL is not set", () => {
    expect(getSiteUrl()).toBe("https://perebarcelopsicologo.com");
  });
});
