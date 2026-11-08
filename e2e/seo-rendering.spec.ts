import { expect, test } from "@playwright/test";

test.use({ javaScriptEnabled: false });

for (const prefix of ["", "/ca"]) {
  for (const route of ["", "/about", "/contact", "/servicios", "/privacy"]) {
    const path = `${prefix}${route}` || "/";
    test(`${path} serves crawlable content and consistent metadata without JavaScript`, async ({
      page,
    }) => {
      const response = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://perebarcelopsicologo.com${path === "/" ? "" : path}`,
      );
      await expect(page.locator('link[hreflang="ca"]')).toHaveAttribute(
        "href",
        `https://perebarcelopsicologo.com/ca${route}`,
      );
      await expect(page.locator('footer a[href$="/privacy"]')).toBeVisible();
      if (route === "/privacy") {
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
        await expect(page.locator('meta[name="googlebot"]')).toHaveCount(0);
      }
    });
  }
}
