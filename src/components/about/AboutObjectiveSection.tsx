"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

export default function AboutObjectiveSection() {
  const t = useTranslations("AboutObjectiveSection");
  const objectives = [t("objective1"), t("objective2"), t("objective3")];
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection className="text-center lg:text-left">
            <SectionLabel text={t("sectionLabel")} />
            <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight leading-[1.1]">
              {t("heading")}
            </h2>
            <p className="mt-6 text-lg text-text leading-relaxed">{t("paragraph1")}</p>
            <p className="mt-2 text-lg text-text leading-relaxed">{t("paragraph2")}</p>
          </AnimatedSection>

          <motion.div
            className="space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {objectives.map((text) => (
              <motion.div
                key={text}
                variants={fadeInUp}
                className="flex items-start gap-4 p-5 rounded-xl bg-background-alt border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors duration-300">
                  <svg
                    role="img"
                    aria-label="Checkmark"
                    className="w-4 h-4 text-primary group-hover:text-text-dark transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <title>Checkmark</title>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-text-dark leading-relaxed pt-0.5">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <AnimatedSection className="mt-16 max-w-2xl mx-auto text-center">
          <div className="p-6 rounded-2xl bg-primary-dark text-text-inverse">
            <p className="text-lg font-bold">{t("highlight")}</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
