"use client";

import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";
import { staggerDelay } from "@/components/home/animations";

export default function ProcessSection() {
  const t = useTranslations("ProcessSection");
  const steps = [
    { step: "1", title: t("step1Title"), desc: t("step1Desc") },
    { step: "2", title: t("step2Title"), desc: t("step2Desc") },
    { step: "3", title: t("step3Title"), desc: t("step3Desc") },
    { step: "4", title: t("step4Title"), desc: t("step4Desc") },
  ];
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(28,71,97,0.2)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="text-center mb-20">
          <SectionLabel text={t("sectionLabel")} />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark tracking-tight">
            {t("heading")}
          </h2>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute top-[3.25rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent hidden lg:block" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((item, i) => (
              <div
                key={item.step}
                className="opacity-0 animate-fade-in-up relative text-center lg:text-left"
                style={{ animationDelay: `${staggerDelay(i, 0.1, 0.12)}ms` }}
              >
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-primary font-bold text-xl z-10 relative">
                      {item.step}
                    </div>
                    <div className="absolute inset-0 bg-secondary/20 rounded-2xl blur-lg" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-dark mt-1 lg:mt-0">{item.title}</h3>
                    <p className="text-text-light mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
