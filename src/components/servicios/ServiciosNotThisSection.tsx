"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

export default function ServiciosNotThisSection() {
  const t = useTranslations("ServiciosNotThisSection");
  const notItems = [
    { text: t("notItem1"), isFalse: true },
    { text: t("notItem2"), isFalse: true },
    { text: t("notItem3"), isFalse: true },
  ];
  const yesItems = [
    { text: t("yesItem1"), isFalse: false },
    { text: t("yesItem2"), isFalse: false },
  ];
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <AnimatedSection>
              <SectionLabel text={t("sectionLabel")} />
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight leading-[1.1]">
                {t("heading")}
              </h2>
            </AnimatedSection>

            <motion.div
              className="mt-8 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
            >
              {notItems.map((item) => (
                <motion.div
                  key={item.text}
                  variants={fadeInUp}
                  className="flex items-center gap-4 p-5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30"
                >
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                    <svg
                      role="img"
                      aria-label="No es esto"
                      className="w-4 h-4 text-red-500 dark:text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <title>Eliminado</title>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-text-dark font-medium">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <AnimatedSection>
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight leading-[1.1]">
                {t("yesHeading")}
              </h2>
            </AnimatedSection>

            <motion.div
              className="mt-8 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
            >
              {yesItems.map((item) => (
                <motion.div
                  key={item.text}
                  variants={fadeInUp}
                  className="flex items-center gap-4 p-5 rounded-xl bg-secondary/5 border border-secondary/20"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                    <svg
                      role="img"
                      aria-label="Checkmark"
                      className="w-4 h-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <title>Checkmark</title>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-text-dark font-medium">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
