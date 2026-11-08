import { expect, test } from "@playwright/test";

const origin = "https://perebarcelopsicologo.com";
const routes = ["", "/about", "/contact", "/privacy", "/servicios"];

for (const locale of ["es", "ca"]) {
  for (const route of routes) {
    const path = `${locale === "ca" ? "/ca" : ""}${route}` || "/";
    test(`${path} has consistent rendered and server SEO signals`, async ({ page, request }) => {
      // Keep page-load assertions independent from live advertising/booking services.
      await page.route("**/*", (requestRoute) => {
        const url = new URL(requestRoute.request().url());
        return url.hostname === "localhost" ? requestRoute.continue() : requestRoute.abort();
      });
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("head > title")).not.toBeEmpty();
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S/);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).not.toBeEmpty();
      const canonical = `${origin}${path === "/" ? "" : path}`;
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
      const alternates = {
        "x-default": `${origin}${route}`,
        es: `${origin}${route}`,
        ca: `${origin}/ca${route}`,
      };
      for (const [language, url] of Object.entries(alternates)) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${language}"]`)).toHaveAttribute(
          "href",
          url,
        );
        const target = await request.get(new URL(url).pathname, { maxRedirects: 0 });
        expect(target.status()).toBe(200);
      }
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        route === "/privacy" ? "noindex, follow" : "index, follow",
      );
      if (route === "/privacy") {
        await expect(page.locator('meta[name="googlebot"]')).toHaveCount(0);
      }
      const html = await response?.text();
      expect(html).toContain(`href="${canonical}"`);
      expect(html).toContain("<h1");
      expect(html).not.toContain('"@type":"LocalBusiness"');
      const person = JSON.parse(await page.locator("#person-schema").innerText());
      expect(person).toMatchObject({ "@type": "Person", name: "Pere Barceló Lambea" });
      for (const field of ["address", "geo", "openingHoursSpecification", "priceRange"]) {
        expect(person).not.toHaveProperty(field);
      }
    });
  }
}

test("sitemap includes only indexable localized canonicals with reciprocal alternates", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  expect(entries).toHaveLength(8);
  expect(xml).not.toContain("/privacy");
  expect(xml).not.toContain("<lastmod>");
  for (const route of ["", "/about", "/contact", "/servicios"]) {
    for (const locale of ["es", "ca"]) {
      const url = `${origin}${locale === "ca" ? "/ca" : ""}${route}`;
      const entry = entries.find((value) => value.includes(`<loc>${url}</loc>`));
      expect(entry).toBeDefined();
      for (const language of ["x-default", "es", "ca"]) {
        const href = `${origin}${language === "ca" ? "/ca" : ""}${route}`;
        expect(entry).toContain(`hreflang="${language}" href="${href}"`);
      }
    }
  }
});
