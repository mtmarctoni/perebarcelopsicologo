import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/site", () => ({
  getCanonicalUrl: () => "https://perebarcelopsicologo.com",
}));

import RootLayout from "@/app/layout";

describe("site entity structured data", () => {
  it("renders an online professional without physical-business claims", () => {
    const html = renderToStaticMarkup(RootLayout({ children: "Page" }));
    const entities = [
      ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/g),
    ].map((match) => JSON.parse(match[1]));
    const person = entities.find((entity) => entity["@type"] === "Person");
    expect(person).toMatchObject({
      "@id": "https://perebarcelopsicologo.com#person",
      name: "Pere Barceló Lambea",
      url: "https://perebarcelopsicologo.com",
    });
    expect(person.sameAs).toHaveLength(2);
    expect(entities.some((entity) => entity["@type"] === "WebSite")).toBe(true);
    for (const entity of entities) {
      expect(entity["@type"]).not.toBe("LocalBusiness");
      for (const field of ["address", "geo", "openingHoursSpecification", "priceRange"]) {
        expect(entity).not.toHaveProperty(field);
      }
    }
  });
});
