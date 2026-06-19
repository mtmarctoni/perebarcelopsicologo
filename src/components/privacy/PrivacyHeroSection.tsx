"use client";

import { useTranslations } from "next-intl";

import SectionLabel from "@/components/composables/SectionLabel";
import { staggerDelay } from "@/components/home/animations";

export default function PrivacyHeroSection() {
  const t = useTranslations("PrivacyHeroSection");
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(185,216,235,0.06)_0%,_transparent_60%)]" />
      <div className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="text-center max-w-2xl mx-auto">
          <div
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${staggerDelay(0)}ms` }}
          >
            <SectionLabel text={t("sectionLabel")} />
          </div>

          <h1
            className="opacity-0 animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark tracking-tight leading-[1.1]"
            style={{ animationDelay: `${staggerDelay(1)}ms` }}
          >
            {t("heading")}
          </h1>

          <p
            className="opacity-0 animate-fade-in-up mt-6 text-lg text-text-light leading-relaxed"
            style={{ animationDelay: `${staggerDelay(2)}ms` }}
          >
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
