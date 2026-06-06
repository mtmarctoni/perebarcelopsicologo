"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/composables/AnimatedSection";

export default function AboutCtaSection() {
  const t = useTranslations("AboutCtaSection");
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(245,158,11,0.08)_0%,_transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32 text-center">
        <AnimatedSection>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark tracking-tight leading-[1.1]">
            {t("heading")}
          </h2>
          <p className="mt-8 text-xl text-text-light max-w-xl mx-auto">{t("subtitle")}</p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-secondary text-text-dark text-lg font-bold px-10 py-5 rounded-full hover:bg-secondary-light hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
            >
              {t("cta")}
            </Link>
          </div>
          <p className="mt-4 text-text-dark opacity-30 text-sm">{t("finePrint")}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
