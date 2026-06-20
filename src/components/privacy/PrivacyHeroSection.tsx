"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { useTranslations } from "next-intl";

import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

export default function PrivacyHeroSection() {
  const t = useTranslations("PrivacyHeroSection");
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(185,216,235,0.06)_0%,_transparent_60%)]" />
        <div className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
          <m.div
            className="text-center max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <m.div variants={fadeInUp}>
              <SectionLabel text={t("sectionLabel")} />
            </m.div>

            <m.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark tracking-tight leading-[1.1]"
            >
              {t("heading")}
            </m.h1>

            <m.p variants={fadeInUp} className="mt-6 text-lg text-text-light leading-relaxed">
              {t("subtitle")}
            </m.p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
