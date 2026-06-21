"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { clientEnv } from "@/config/client-env.config";

const calendlyBaseUrl = clientEnv.NEXT_PUBLIC_CALENDLY_URL;

const LOAD_TIMEOUT_MS = 8_000;

// Known Calendly vendor warning (harmless):
// "Cannot render a sync or defer <script> outside the main document..."
// This is emitted by Calendly's own Next.js scripts inside the iframe.
// It is cross-origin, so we cannot intercept it. Calendly works fine.
// See: https://nextjs.org/docs/messages/next-script-legacy-behavior

function estimateFrameHeight(containerWidth: number): number {
  if (containerWidth < 640) return 1080;
  if (containerWidth < 1024) return 920;
  return 800;
}

function buildEmbedUrl(base: string): string {
  const url = new URL(base);
  url.searchParams.set("embed_domain", window.location.hostname);
  url.searchParams.set("embed_type", "Inline");
  return url.toString();
}

function CalendlySkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse" aria-hidden>
      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1">
            <div className="h-3 w-16 mx-auto rounded-full bg-text-light/10 mb-3" />
            <div className="h-10 rounded-xl bg-text-light/10" />
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="h-3 w-20 rounded-full bg-text-light/10" />
            <div className="flex-1 h-10 rounded-xl bg-text-light/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

const CalendlyBookingCard = () => {
  const t = useTranslations("CalendlyBookingCard");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeHeight, setIframeHeight] = useState(920);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");
  const hasCalendly = Boolean(calendlyBaseUrl);

  useEffect(() => {
    if (calendlyBaseUrl) {
      setEmbedUrl(buildEmbedUrl(calendlyBaseUrl));
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setIframeHeight(estimateFrameHeight(width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.source !== iframeRef.current?.contentWindow) return;
      if (typeof e.data?.event !== "string") return;
      if (e.data.event.indexOf("calendly") !== 0) return;

      if (e.data.event === "calendly.resize" && typeof e.data.height === "number") {
        setIframeHeight(e.data.height);
      }

      if (e.data.event === "calendly.event_scheduled") {
        window.dataLayer?.push({ event: "calendly_scheduled" });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (isLoaded) return;
    const timer = setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div>
      {hasCalendly ? (
        <div ref={containerRef} className="relative" style={{ minHeight: iframeHeight }}>
          {!isLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col p-6 sm:p-8">
              <CalendlySkeleton />
            </div>
          )}
          {embedUrl && (
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title="Calendly booking"
              className="w-full transition-all duration-500"
              style={{
                height: iframeHeight,
                opacity: isLoaded ? 1 : 0,
              }}
              onLoad={() => setIsLoaded(true)}
              allow="camera; microphone; autoplay; fullscreen; display-capture"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
            />
          )}
          {timedOut && !isLoaded && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-background-alt/90 backdrop-blur-sm p-8">
              <button
                type="button"
                onClick={() => {
                  setTimedOut(false);
                  setIsLoaded(false);
                  const iframe = iframeRef.current;
                  if (iframe) {
                    iframe.src = embedUrl;
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors duration-300"
              >
                {t("openCalendar")}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 flex flex-col justify-center items-start gap-4 min-h-[320px]">
          <p className="text-text leading-relaxed">{t("placeholderText")}</p>
          <p className="text-text-light text-sm leading-relaxed">{t("configHint")}</p>
        </div>
      )}
    </div>
  );
};

export default CalendlyBookingCard;
