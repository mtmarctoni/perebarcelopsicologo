"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import SectionLabel from "@/components/composables/SectionLabel";
import { staggerDelay } from "@/components/home/animations";

export default function ServiciosHeroSection() {
  const t = useTranslations("ServiciosHeroSection");
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,_rgba(185,216,235,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(28,71,97,0.25)_0%,_transparent_60%)]" />

      <div className="absolute top-0 left-[25%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-0">
        <div className="max-w-3xl">
          <div
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${staggerDelay(0)}ms` }}
          >
            <SectionLabel text={t("sectionLabel")} />
          </div>

          <h1
            className="opacity-0 animate-fade-in-up text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-text-dark tracking-tight leading-[1.1] mt-2"
            style={{ animationDelay: `${staggerDelay(1)}ms` }}
          >
            {t("heading")}
          </h1>

          <p
            className="opacity-0 animate-fade-in-up mt-6 text-lg sm:text-xl text-text-light max-w-2xl leading-relaxed"
            style={{ animationDelay: `${staggerDelay(2)}ms` }}
          >
            {t("subtitle")}
          </p>

          <div
            className="opacity-0 animate-fade-in-up mt-10"
            style={{ animationDelay: `${staggerDelay(3)}ms` }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-center bg-secondary text-text-dark dark:text-[#0f172a] font-bold text-base px-8 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              {t("cta")}
            </Link>
          </div>
          <p
            className="opacity-0 animate-fade-in-up mt-3 text-text-light text-sm"
            style={{ animationDelay: `${staggerDelay(4)}ms` }}
          >
            {t("finePrint")}
          </p>
        </div>
      </div>
    </section>
  );
}
