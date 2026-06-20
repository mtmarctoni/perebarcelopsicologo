"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";

export default function AboutWhySection() {
  const t = useTranslations("AboutWhySection");
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-text-dark opacity-[0.02] select-none pointer-events-none">
        ?
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimatedSection className="text-center lg:text-left">
            <SectionLabel text={t("sectionLabel")} />
            <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight leading-[1.1]">
              {t("heading")}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="text-center lg:text-left">
            <div className="space-y-5">
              <p className="text-lg text-text leading-relaxed">{t("paragraph1")}</p>
              <p className="text-lg text-text leading-relaxed">{t("paragraph2")}</p>
              <p className="text-lg text-text leading-relaxed">{t("paragraph3")}</p>
              <p className="text-lg text-text-dark font-bold leading-relaxed">{t("highlight")}</p>
              <div className="mt-8 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center text-center bg-secondary text-text-dark dark:text-[#0f172a] font-bold px-8 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t("cta")}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
