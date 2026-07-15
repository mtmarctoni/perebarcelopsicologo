"use client";

import { useTranslations } from "next-intl";

export default function CookieSettingsLink() {
  const t = useTranslations("CookieBanner");

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-banner"))}
      className="text-text-inverse opacity-25 hover:opacity-50 text-xs transition-all duration-300"
    >
      {t("settings")}
    </button>
  );
}
