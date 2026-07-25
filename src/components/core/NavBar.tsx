"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/core/ThemeProvider";
import CTAButton from "@/components/ui/CTAButton";
import NavLink from "@/components/ui/NavLink";
import { navRoutes } from "@/config/routes";
import { Link, useRouter } from "@/i18n/routing";
import { BarsIcon, CrossIcon } from "../composables/Icons";

const navItems = navRoutes.filter((r) => r.href !== "/contact");

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("NavBar");
  const tc = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();

  const handleScrollRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    handleScrollRef.current = () => {
      setIsScrolled(window.scrollY > 20);
    };
  });

  useEffect(() => {
    const handler = () => handleScrollRef.current?.();
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const otherLocale = locale === "es" ? "ca" : "es";

  const switchLocale = () => {
    const currentPath = window.location.pathname.replace(/^\/(es|ca)(\/|$)/, "/");
    router.replace(currentPath || "/", { locale: otherLocale });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ${
          isScrolled
            ? "bg-background-navbar backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link
              href="/"
              className="text-text-dark font-bold text-lg tracking-tight whitespace-nowrap hover:text-primary transition-colors duration-300"
            >
              {tc("siteNameShort")}
              <span className="font-normal text-text-light ml-1.5 text-base">
                {tc("siteSubtext")}
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                return (
                  <NavLink key={item.href} href={item.href}>
                    {t(item.labelKey)}
                  </NavLink>
                );
              })}

              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-3 p-2 rounded-xl text-text-light hover:text-primary hover:bg-card-hover transition-colors duration-300"
                aria-label={theme === "dark" ? tc("themeLight") : tc("themeDark")}
              >
                {theme === "dark" ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    role="img"
                    aria-label={tc("themeLight")}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    role="img"
                    aria-label={tc("themeDark")}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>

              <button
                type="button"
                onClick={switchLocale}
                className="ml-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-lg
                          text-text-light hover:text-primary hover:bg-card-hover
                          transition-colors duration-300 border border-border"
                aria-label={tc("localeSwitcherAria")}
              >
                {otherLocale}
              </button>

              <CTAButton href="/contact" size="sm" location="navbar" className="ml-4">
                {t("ctaDesktop")}
              </CTAButton>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <CTAButton href="/contact" size="xs" location="mobile-nav-bar">
                {t("ctaMobile")}
              </CTAButton>

              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-text-dark hover:text-primary p-2 rounded-xl hover:bg-card-hover transition-colors duration-300"
                aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
              >
                {isMenuOpen ? <CrossIcon className="w-6 h-6" /> : <BarsIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-background backdrop-blur-xl transition-[opacity,visibility] duration-500 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
          <div className="absolute top-6 right-6">
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="text-text-dark hover:text-primary p-2 rounded-xl hover:bg-card-hover transition-colors duration-300"
              aria-label={t("closeMenu")}
            >
              <CrossIcon className="w-7 h-7" />
            </button>
          </div>

          {navItems.map((item, index) => {
            return (
              <NavLink
                key={item.href}
                href={item.href}
                mobile
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${(index + 1) * 50}ms` }}
              >
                {t(item.labelKey)}
              </NavLink>
            );
          })}

          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mt-4 p-3 rounded-xl text-text-light hover:text-primary hover:bg-card-hover transition-colors duration-300"
            aria-label={theme === "dark" ? tc("themeLight") : tc("themeDark")}
          >
            {theme === "dark" ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                role="img"
                aria-label={tc("themeLight")}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                role="img"
                aria-label={tc("themeDark")}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={switchLocale}
            className="px-4 py-2 text-sm font-semibold uppercase tracking-widest rounded-xl
                     text-text-light hover:text-primary hover:bg-card-hover
                     transition-colors duration-300 border border-border"
            aria-label={tc("localeSwitcherAria")}
          >
            {otherLocale}
          </button>

          <CTAButton
            href="/contact"
            location="mobile-nav"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4"
          >
            {t("ctaDesktop")}
          </CTAButton>
        </div>
      </div>
    </>
  );
};

export default Navbar;
