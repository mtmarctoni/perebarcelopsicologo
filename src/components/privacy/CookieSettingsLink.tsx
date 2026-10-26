"use client";

import { useTranslations } from "next-intl";

export default function CookieSettingsLink() {
  const t = useTranslations("CookieBanner");

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-banner"))}
      className="footer-legal-link"
    >
      {t("settings")}
    </button>
  );
}
