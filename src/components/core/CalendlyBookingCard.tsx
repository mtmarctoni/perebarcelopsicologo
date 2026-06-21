"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { clientEnv } from "@/config/client-env.config";

const calendlyUrl = clientEnv.NEXT_PUBLIC_CALENDLY_URL;

const CalendlyBookingCard = () => {
  const t = useTranslations("CalendlyBookingCard");
  const [iframeHeight, setIframeHeight] = useState(700);
  const hasCalendly = Boolean(calendlyUrl);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        e.origin === "https://calendly.com" &&
        e.data?.event?.indexOf?.("calendly") === 0
      ) {
        if (e.data.event === "calendly.resize" && e.data.height) {
          setIframeHeight(e.data.height);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="bg-background rounded-3xl shadow-card p-8 sm:p-10 h-full flex flex-col">
      <span className="text-primary text-sm font-semibold uppercase tracking-widest">
        {t("label")}
      </span>
      <h2 className="text-3xl font-bold text-text-dark mt-3 tracking-tight">{t("heading")}</h2>
      <p className="text-text mt-4 leading-relaxed">{t("description")}</p>

      {hasCalendly ? (
        <div className="mt-8 rounded-2xl overflow-hidden border border-secondary/20 bg-background-alt">
          <iframe
            src={calendlyUrl}
            title="Calendly booking"
            className="w-full"
            style={{ height: iframeHeight }}
            loading="lazy"
            allow="camera; microphone; autoplay; fullscreen; display-capture"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
          />
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-secondary/30 bg-background-alt p-8 flex flex-col justify-center items-start gap-4 min-h-[320px]">
          <p className="text-text leading-relaxed">{t("placeholderText")}</p>
          <p className="text-text-light text-sm leading-relaxed">{t("configHint")}</p>
        </div>
      )}
    </div>
  );
};

export default CalendlyBookingCard;
