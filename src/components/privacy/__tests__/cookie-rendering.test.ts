import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Structural guards; consent transitions also require production-browser checks.
const source = readFileSync("src/components/privacy/CookieBanner.tsx", "utf8");

describe("cookie banner rendering", () => {
  it("links the dialog description to the neutral privacy paragraph ID", () => {
    const descriptionId = source.match(/aria-describedby="([^"]+)"/)?.[1];
    const paragraphId = source.match(/<p id="([^"]+)"/)?.[1];
    expect(descriptionId).toBe("privacy-consent-description");
    expect(paragraphId).toBe(descriptionId);
    expect(source.includes("cookie-banner-message")).toBe(false);
  });
});
