import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

const banner = (page: Page) => page.getByRole("dialog", { name: "Consentimiento de cookies" });
const closeButton = (page: Page) => banner(page).getByRole("button", { name: "Cerrar" });
const settings = (page: Page) => page.getByRole("button", { name: "Configuración de cookies" });

test.beforeEach(async ({ page }) => {
  await page.goto("/es");
  await expect(banner(page)).toBeVisible();
});

test("names the panel with a visible heading and keeps all controls within the viewport", async ({
  page,
}) => {
  await expect(banner(page).getByRole("heading", { name: "Tu privacidad" })).toBeVisible();
  await expect(banner(page).getByRole("button", { name: "Solo esenciales" })).toBeVisible();
  await expect(banner(page).getByRole("button", { name: "Aceptar todas" })).toBeVisible();
  for (const control of await banner(page).getByRole("button").all()) {
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    expect(box?.height).toBeGreaterThanOrEqual(44);
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.x).toBeGreaterThanOrEqual(0);
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(page.viewportSize()?.width ?? 0);
  }
});

test("closing saves no consent and stays dismissed on same-tab navigation", async ({
  page,
  context,
}) => {
  await closeButton(page).click();
  await expect(banner(page)).toHaveCount(0);
  expect(
    (await context.cookies()).find((cookie) => cookie.name === "cookie_consent"),
  ).toBeUndefined();
  await page.goto("/es/privacy");
  await expect(settings(page)).toBeVisible();
  await expect(banner(page)).toHaveCount(0);
  await settings(page).click();
  await expect(banner(page)).toBeVisible();
  await expect(closeButton(page)).toBeFocused();
});

test("Escape dismisses only while focus is in the banner and restores focus", async ({ page }) => {
  await page.getByRole("main").click({ position: { x: 10, y: 10 } });
  await page.keyboard.press("Escape");
  await expect(banner(page)).toBeVisible();
  await closeButton(page).click();
  await expect(banner(page)).toHaveCount(0);
  await settings(page).click();
  await expect(closeButton(page)).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(banner(page)).toHaveCount(0);
  await expect(settings(page)).toBeFocused();
});

for (const choice of ["accepted", "rejected"] as const) {
  test(`explicit ${choice} choice persists, reopening and closing preserves it`, async ({
    page,
    context,
  }) => {
    await banner(page)
      .getByRole("button", { name: choice === "accepted" ? "Aceptar todas" : "Solo esenciales" })
      .click();
    await expect(banner(page)).toHaveCount(0);
    expect(
      (await context.cookies()).find((cookie) => cookie.name === "cookie_consent")?.value,
    ).toBe(choice);
    await page.reload();
    await settings(page).click();
    await expect(closeButton(page)).toBeFocused();
    await closeButton(page).click();
    await expect(banner(page)).toHaveCount(0);
    await expect(settings(page)).toBeFocused();
    expect(
      (await context.cookies()).find((cookie) => cookie.name === "cookie_consent")?.value,
    ).toBe(choice);
  });
}

test("reopening during the exit animation cancels the pending dismissal", async ({ page }) => {
  await closeButton(page).focus();
  await page.keyboard.press("Escape");
  await page.evaluate(() => window.dispatchEvent(new Event("open-cookie-banner")));
  await page.waitForTimeout(400);
  await expect(banner(page)).toBeVisible();
  await expect(closeButton(page)).toBeFocused();
});

test("dismissal still works when session storage is blocked", async ({ page, context }) => {
  await context.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", {
      get() {
        throw new Error("Storage blocked");
      },
    });
  });
  await page.reload();
  await expect(banner(page)).toBeVisible();
  await closeButton(page).click();
  await expect(banner(page)).toHaveCount(0);
});

test("Catalan controls are localized", async ({ page }) => {
  await page.goto("/ca");
  const catalanBanner = page.getByRole("dialog", { name: "Consentiment de cookies" });
  await expect(catalanBanner.getByRole("heading", { name: "La teva privacitat" })).toBeVisible();
  await catalanBanner.getByRole("button", { name: "Tancar" }).click();
  await expect(catalanBanner).toHaveCount(0);
});

for (const theme of ["light", "dark"]) {
  test(`${theme} panel visibly transmits the backdrop and gives acceptance primary styling`, async ({
    page,
  }) => {
    await page.evaluate(
      (value) => document.documentElement.classList.toggle("dark", value === "dark"),
      theme,
    );
    const glass = await banner(page).evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        alpha: Number(style.backgroundColor.match(/[\d.]+/g)?.[3] ?? 1),
        blur: Number(style.backdropFilter.match(/blur\(([\d.]+)px\)/)?.[1] ?? 0),
      };
    });
    expect.soft(glass.alpha).toBeGreaterThanOrEqual(0.85);
    expect.soft(glass.alpha).toBeLessThanOrEqual(0.92);
    expect.soft(glass.blur).toBeGreaterThanOrEqual(24);

    const accept = banner(page).getByRole("button", { name: "Aceptar todas" });
    const reject = banner(page).getByRole("button", { name: "Solo esenciales" });
    const acceptBackground = await accept.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );
    expect(acceptBackground).not.toBe("rgba(0, 0, 0, 0)");
    expect(acceptBackground).not.toBe(
      await reject.evaluate((element) => getComputedStyle(element).backgroundColor),
    );
    await accept.hover();
    await page.waitForTimeout(350);
    const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
    expect(results.violations).toEqual([]);
  });

  test(`${theme} banner has no accessibility violations over bright or dark content`, async ({
    page,
  }) => {
    await page.evaluate(
      (value) => document.documentElement.classList.toggle("dark", value === "dark"),
      theme,
    );
    for (const background of ["#ffffff", "#000000"]) {
      await page.evaluate((value) => {
        const backdrop = document.createElement("div");
        backdrop.style.cssText = `position:fixed;inset:0;background:${value};z-index:49;pointer-events:none`;
        backdrop.dataset.testBackdrop = "";
        document.body.append(backdrop);
      }, background);
      await page.waitForTimeout(350);
      const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
      expect(results.violations).toEqual([]);
      await page.locator("[data-test-backdrop]").evaluateAll((elements) => {
        for (const element of elements) element.remove();
      });
    }
  });
}

test("reduced motion and a narrow viewport retain accessible controls and readable solid fallback", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 568 });
  await page.addStyleTag({
    content:
      ".cookie-banner-surface { backdrop-filter: none !important; background: var(--cookie-surface-solid) !important; }",
  });
  await expect(closeButton(page)).toBeInViewport();
  await expect(banner(page).getByRole("button", { name: "Aceptar todas" })).toBeInViewport();
  const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
  expect(results.violations).toEqual([]);
  await closeButton(page).click();
  await expect(banner(page)).toHaveCount(0);
});

test("light-theme active desktop navigation has sufficient contrast", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  await page.waitForTimeout(350);
  const results = await new AxeBuilder({ page })
    .include("nav")
    .withRules(["color-contrast"])
    .analyze();
  expect(results.violations).toEqual([]);
});
