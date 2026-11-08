import { expect, type Page, test } from "@playwright/test";
import ca from "../src/messages/ca.json";
import es from "../src/messages/es.json";

const messages = { es, ca };
const localizedPath = (locale: "es" | "ca", pathname: string) =>
  locale === "ca" ? `/ca${pathname === "/" ? "" : pathname}` : pathname;

async function dismissCookies(page: Page, locale: "es" | "ca") {
  const dialog = page.getByRole("dialog", { name: messages[locale].CookieBanner.ariaLabel });
  await expect(dialog).toBeVisible();
  await dialog
    .getByRole("button", { name: messages[locale].CookieBanner.close, exact: true })
    .click();
  await expect(dialog).not.toBeVisible();
}

for (const locale of ["es", "ca"] as const) {
  test(`${locale} navigation and booking keep the selected language after switching`, async ({
    page,
    isMobile,
  }) => {
    const initial = locale === "es" ? "ca" : "es";
    await page.goto(`/${initial}`);
    await dismissCookies(page, initial);

    if (isMobile) {
      await page
        .getByRole("button", { name: messages[initial].NavBar.openMenu, exact: true })
        .click();
    }
    await page
      .getByRole("button", { name: messages[initial].Common.localeSwitcherAria, exact: true })
      .filter({ visible: true })
      .click();
    await expect(page.locator("html")).toHaveAttribute("lang", locale);

    if (isMobile) {
      const open = page.getByRole("button", {
        name: messages[locale].NavBar.openMenu,
        exact: true,
      });
      if (await open.isVisible()) await open.click();
    }
    const about = isMobile
      ? page
          .locator('a[data-track-location="mobile-nav"]')
          .filter({ hasText: messages[locale].NavBar.about })
      : page
          .getByRole("navigation")
          .getByRole("link", { name: messages[locale].NavBar.about, exact: true });
    await expect(about).toHaveAttribute("href", localizedPath(locale, "/about"));
    await about.click();
    await expect(page).toHaveURL(new RegExp(`${localizedPath(locale, "/about")}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", locale);

    const booking = page
      .getByRole("navigation")
      .getByRole("link", {
        name: isMobile ? messages[locale].NavBar.ctaMobile : messages[locale].NavBar.ctaDesktop,
        exact: true,
      })
      .filter({ visible: true });
    await expect(booking).toHaveAttribute("href", localizedPath(locale, "/contact"));
    await booking.click();
    await expect(page).toHaveURL(new RegExp(`${localizedPath(locale, "/contact")}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
  });

  test(`${locale} footer links retain the language and external contact links`, async ({
    page,
  }) => {
    await page.goto(`/${locale}`);
    await dismissCookies(page, locale);
    const footer = page.getByRole("contentinfo");
    const about = footer.getByRole("link", { name: messages[locale].NavBar.about, exact: true });
    await expect(about).toHaveAttribute("href", localizedPath(locale, "/about"));
    await expect(footer.locator('a[data-track="cta"]')).toHaveAttribute(
      "href",
      localizedPath(locale, "/contact"),
    );
    await expect(footer.locator('a[href^="mailto:"]')).toHaveAttribute(
      "href",
      `mailto:${messages[locale].Common.email}`,
    );
    await expect(footer.locator('a[href^="tel:"]')).toHaveAttribute("href", /^tel:/);
    await about.click();
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    const privacy = footer.getByRole("link", {
      name: messages[locale].Footer.privacyLink,
      exact: true,
    });
    await expect(privacy).toHaveAttribute("href", localizedPath(locale, "/privacy"));
    await privacy.click();
    await expect(page).toHaveURL(new RegExp(`${localizedPath(locale, "/privacy")}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    const home = footer.getByRole("link", { name: /Pere Barceló/ });
    await expect(home).toHaveAttribute("href", localizedPath(locale, "/"));
    await home.click();
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
  });
}
