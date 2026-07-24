"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/routing";

export type ConsentChoice = "accepted" | "rejected";

const CONSENT_KEY = "cookie_consent";
const CONSENT_DAYS = 365;
const EXIT_ANIMATION_MS = 300;

function getStoredConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_KEY}=`));
  if (!match) return null;
  return match.split("=")[1] as ConsentChoice;
}

function storeConsent(choice: ConsentChoice) {
  const expires = new Date(Date.now() + CONSENT_DAYS * 86400000).toUTCString();
  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
  // biome-ignore lint/suspicious/noDocumentCookie: client-side consent cookie is the standard approach
  document.cookie = `${CONSENT_KEY}=${choice}; expires=${expires}; path=/; SameSite=Lax${isSecure ? "; Secure" : ""}`;
}

function CookieIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 1 0 10 10c0-.46-.04-.92-.1-1.36a4 4 0 0 1-5.54-5.54A9.93 9.93 0 0 0 12 2z" />
      <circle cx="9" cy="10" r=".8" fill="currentColor" />
      <circle cx="14" cy="8" r=".8" fill="currentColor" />
      <circle cx="15" cy="14" r=".8" fill="currentColor" />
      <circle cx="10" cy="16" r=".8" fill="currentColor" />
    </svg>
  );
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("CookieBanner");

  useEffect(() => {
    if (!getStoredConsent()) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    function handleReopen() {
      setClosing(false);
      setVisible(true);
    }

    window.addEventListener("open-cookie-banner", handleReopen);
    return () => window.removeEventListener("open-cookie-banner", handleReopen);
  }, []);

  const handleChoice = useCallback((choice: ConsentChoice) => {
    storeConsent(choice);
    window.dispatchEvent(new Event("consent-updated"));
    if (choice === "accepted" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
      window.dataLayer?.push({ event: "consent_granted" });
    } else if (choice === "rejected" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
    }
    setClosing(true);
    window.setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, EXIT_ANIMATION_MS);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex items-end justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="false"
      aria-label={t("ariaLabel")}
    >
      <div
        ref={dialogRef}
        className={`w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl ${
          closing ? "animate-cookie-banner-out" : "animate-cookie-banner-in"
        }`}
      >
        <div className="flex items-start gap-4 p-5 sm:p-6">
          <div className="hidden sm:flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-primary-light/20 text-primary">
            <CookieIcon className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <p className="text-sm leading-relaxed text-text-light">
              {t("message")}{" "}
              <Link
                href="/privacy"
                className="text-primary underline underline-offset-2 hover:text-primary-dark transition-colors font-medium"
              >
                {t("privacyLink")}
              </Link>
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => handleChoice("rejected")}
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-light transition-all hover:bg-card-hover hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {t("reject")}
              </button>
              <button
                type="button"
                onClick={() => handleChoice("accepted")}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-text-inverse transition-all hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-black"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
