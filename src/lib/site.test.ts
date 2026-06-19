import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { getEnvironment, getRobotsMetadata, getSiteUrl, isProduction } from "./site";

const OriginalEnv = process.env;

describe("getEnvironment", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...OriginalEnv };
  });

  afterAll(() => {
    process.env = OriginalEnv;
  });

  it("returns development when no VERCEL_ENV or APP_ENV is set", () => {
    delete process.env.VERCEL_ENV;
    delete process.env.APP_ENV;
    expect(getEnvironment()).toBe("development");
  });

  it("returns production when VERCEL_ENV=production and URL does not start with app.", () => {
    process.env.VERCEL_ENV = "production";
    process.env.VERCEL_URL = "perebarcelopsicologo.com";
    expect(getEnvironment()).toBe("production");
  });

  it("returns staging when VERCEL_ENV=production and URL starts with app.", () => {
    process.env.VERCEL_ENV = "production";
    process.env.VERCEL_URL = "app.perebarcelopsicologo.com";
    expect(getEnvironment()).toBe("staging");
  });

  it("returns preview when VERCEL_ENV=preview", () => {
    process.env.VERCEL_ENV = "preview";
    expect(getEnvironment()).toBe("preview");
  });

  it("returns development for unknown VERCEL_ENV", () => {
    process.env.VERCEL_ENV = "development";
    expect(getEnvironment()).toBe("development");
  });

  it("uses APP_ENV when VERCEL_ENV is not set", () => {
    delete process.env.VERCEL_ENV;
    process.env.APP_ENV = "production";
    expect(getEnvironment()).toBe("production");
  });
});

describe("isProduction", () => {
  beforeEach(() => {
    process.env = { ...OriginalEnv };
  });

  afterAll(() => {
    process.env = OriginalEnv;
  });

  it("returns true when in production", () => {
    process.env.VERCEL_ENV = "production";
    process.env.VERCEL_URL = "perebarcelopsicologo.com";
    expect(isProduction()).toBe(true);
  });

  it("returns false when in development", () => {
    delete process.env.VERCEL_ENV;
    delete process.env.APP_ENV;
    expect(isProduction()).toBe(false);
  });
});

describe("getSiteUrl", () => {
  it("always returns the production URL", () => {
    expect(getSiteUrl()).toBe("https://perebarcelopsicologo.com");
  });
});

describe("getRobotsMetadata", () => {
  beforeEach(() => {
    process.env = { ...OriginalEnv };
  });

  afterAll(() => {
    process.env = OriginalEnv;
  });

  it("allows indexing in production", () => {
    process.env.VERCEL_ENV = "production";
    process.env.VERCEL_URL = "perebarcelopsicologo.com";
    const robots = getRobotsMetadata();
    expect(robots).toEqual({
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

  it("blocks indexing in non-production", () => {
    delete process.env.VERCEL_ENV;
    delete process.env.APP_ENV;
    const robots = getRobotsMetadata();
    expect(robots).toEqual({ index: false, follow: false });
  });
});
