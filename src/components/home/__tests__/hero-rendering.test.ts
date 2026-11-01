import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Structural guard; browser tests verify visible, successfully loaded hero content without JS.
const source = readFileSync("src/components/home/HeroSection.tsx", "utf8");

describe("hero initial rendering", () => {
  it("uses the server CSS helper for both load entrances without stagger wrappers", () => {
    const entrances = source.match(/<Reveal\b[^>]*>/g) ?? [];
    expect(entrances).toHaveLength(2);
    for (const entrance of entrances) {
      expect(entrance).toContain('trigger="load"');
      expect(entrance).not.toContain("stagger=");
    }
  });

  it("retains the heading, priority portrait and booking link", () => {
    expect(source).toContain("<h1");
    expect(source).toContain("<Image");
    expect(source).toContain('fetchPriority="high"');
    expect(source).toContain('<CTAButton href="/contact" location="hero">');
  });
});
