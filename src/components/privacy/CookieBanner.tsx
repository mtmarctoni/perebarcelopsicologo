"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/routing";

export type ConsentChoice = "accepted" | "rejected";

const CONSENT_KEY = "cookie_consent";
const CONSENT_DAYS = 365;
const DISMISSED_KEY = "cookie_banner_dismissed";
const EXIT_ANIMATION_MS = 300;

function getStoredConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_KEY}=`));
  if (!match) return null;
  const choice = match.split("=")[1];
  return choice === "accepted" || choice === "rejected" ? choice : null;
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
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const focusOnOpenRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);
  const t = useTranslations("CookieBanner");

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISSED_KEY) === "true";
    } catch {
      // Consent choices and dismissal must still work if storage is unavailable.
    }
    if (!getStoredConsent() && !dismissed) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    function handleReopen() {
      if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
      if (!panelRef.current?.contains(document.activeElement)) {
        returnFocusRef.current =
          document.activeElement instanceof HTMLElement ? document.activeElement : null;
      }
      focusOnOpenRef.current = true;
      setClosing(false);
      setVisible(true);
      closeRef.current?.focus({ preventScroll: true });
    }

    window.addEventListener("open-cookie-banner", handleReopen);
    return () => {
      window.removeEventListener("open-cookie-banner", handleReopen);
      if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (visible && !closing && focusOnOpenRef.current) {
      closeRef.current?.focus({ preventScroll: true });
      focusOnOpenRef.current = false;
    }
  }, [visible, closing]);

  const handleDismiss = useCallback(() => {
    try {
      sessionStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // Do not turn a storage restriction into an undismissible banner.
    }
    if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
    setClosing(true);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : EXIT_ANIMATION_MS;
    exitTimerRef.current = window.setTimeout(() => {
      if (panelRef.current?.contains(document.activeElement)) {
        const previous = returnFocusRef.current;
        const target =
          previous?.isConnected && previous !== document.body
            ? previous
            : document.querySelector("main");
        if (target instanceof HTMLElement) {
          if (!target.hasAttribute("tabindex") && target.tagName === "MAIN") target.tabIndex = -1;
          target.focus({ preventScroll: true });
        }
      }
      setVisible(false);
      setClosing(false);
      exitTimerRef.current = null;
    }, delay);
  }, []);

  const handleChoice = useCallback(
    (choice: ConsentChoice) => {
      storeConsent(choice);
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
      handleDismiss();
    },
    [handleDismiss],
  );

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex items-end justify-center p-4 sm:p-6">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-label={t("ariaLabel")}
        aria-describedby="privacy-consent-description"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.stopPropagation();
            handleDismiss();
          }
        }}
        className={`cookie-banner-surface pointer-events-auto relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border shadow-2xl ${
          closing ? "animate-cookie-banner-out" : ""
        }`}
      >
        <div className="flex items-start gap-4 p-5 sm:p-6">
          <div className="hidden sm:flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-primary-light/20 text-primary">
            <CookieIcon className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-text-dark">{t("title")}</h2>
              <button
                ref={closeRef}
                type="button"
                onClick={handleDismiss}
                aria-label={t("close")}
                className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-text transition-colors hover:bg-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="m6 6 12 12M6 18 18 6" />
                </svg>
              </button>
            </div>
            <p id="privacy-consent-description" className="text-sm leading-relaxed text-text">
              {t("message")}{" "}
              <Link
                href="/privacy"
                className="text-primary underline underline-offset-2 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary font-medium"
              >
                {t("privacyLink")}
              </Link>
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => handleChoice("rejected")}
                className="cookie-banner-choice min-h-11 flex-1 rounded-lg border px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {t("reject")}
              </button>
              <button
                type="button"
                onClick={() => handleChoice("accepted")}
                className="min-h-11 flex-1 rounded-lg border border-primary bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-[#0f172a] dark:hover:bg-secondary-light"
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
