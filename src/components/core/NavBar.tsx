"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/core/ThemeProvider";
import { navRoutes } from "@/config/routes";
import { usePathname, useRouter } from "@/i18n/routing";
import { BarsIcon, CrossIcon } from "../composables/Icons";

const navItems = navRoutes.filter((r) => r.href !== "/contact");

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("NavBar");
  const tc = useTranslations("Common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-text-light px-4 py-2 text-sm font-medium tracking-wide
                             hover:text-text-dark hover:bg-card-hover rounded-lg
                             transition-all duration-300"
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-3 p-2 rounded-xl text-text-light hover:text-primary hover:bg-card-hover transition-all duration-300"
                aria-label={mounted && theme === "dark" ? tc("themeLight") : tc("themeDark")}
              >
                {mounted && theme === "dark" ? (
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
                onClick={() => router.replace(pathname, { locale: otherLocale })}
                className="ml-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-lg
                          text-text-light hover:text-primary hover:bg-card-hover
                          transition-all duration-300 border border-border"
                aria-label={tc("localeSwitcherAria")}
              >
                {otherLocale}
              </button>

              <Link
                href="/contact"
                className="ml-4 inline-flex items-center justify-center bg-secondary text-text-dark dark:text-[#0f172a] text-sm font-bold px-5 py-2.5 rounded-full hover:bg-secondary-light hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
              >
                {t("ctaDesktop")}
              </Link>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-secondary text-text-dark dark:text-[#0f172a] text-xs font-bold px-3 py-2 rounded-full whitespace-nowrap hover:bg-secondary-light transition-all duration-300"
              >
                {t("ctaMobile")}
              </Link>

              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-text-dark hover:text-primary p-2 rounded-xl hover:bg-card-hover transition-all duration-300"
                aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
              >
                {isMenuOpen ? <CrossIcon className="w-6 h-6" /> : <BarsIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-background backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
          <div className="absolute top-6 right-6">
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="text-text-dark hover:text-primary p-2 rounded-xl hover:bg-card-hover transition-all duration-300"
              aria-label={t("closeMenu")}
            >
              <CrossIcon className="w-7 h-7" />
            </button>
          </div>

          {navItems.map((item, index) => {
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold text-text-dark opacity-80 hover:opacity-100 transition-all duration-300"
                  style={{ transitionDelay: `${(index + 1) * 50}ms` }}
                >
                  {t(item.labelKey)}
                </Link>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mt-4 p-3 rounded-xl text-text-light hover:text-primary hover:bg-card-hover transition-all duration-300"
            aria-label={mounted && theme === "dark" ? tc("themeLight") : tc("themeDark")}
          >
            {mounted && theme === "dark" ? (
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
            onClick={() => router.replace(pathname, { locale: otherLocale })}
            className="px-4 py-2 text-sm font-semibold uppercase tracking-widest rounded-xl
                     text-text-light hover:text-primary hover:bg-card-hover
                     transition-all duration-300 border border-border"
            aria-label={tc("localeSwitcherAria")}
          >
            {otherLocale}
          </button>

          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-center bg-secondary text-text-dark dark:text-[#0f172a] text-base font-bold px-8 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow transition-all duration-300"
          >
            {t("ctaDesktop")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
