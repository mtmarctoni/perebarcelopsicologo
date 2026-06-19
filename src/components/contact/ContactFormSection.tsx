"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";

const CalendlyBookingCard = dynamic(() => import("@/components/core/CalendlyBookingCard"), {
  ssr: false,
});

export default function ContactFormSection() {
  const t = useTranslations("ContactFormSection");
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(185,216,235,0.04)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel text={t("sectionLabel")} />
          <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
            {t("heading")}
          </h2>
          <p className="mt-4 text-lg text-text-light max-w-2xl mx-auto">{t("subtitle")}</p>
        </AnimatedSection>

        <AnimatedSection>
          <CalendlyBookingCard />
        </AnimatedSection>
      </div>
    </section>
  );
}
