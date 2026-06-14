"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";
import { scaleIn, staggerContainer } from "@/components/home/animations";

export default function PainPointsSection() {
  const t = useTranslations("PainPointsSection");
  const painPoints = [
    { num: "01", text: t("point1") },
    { num: "02", text: t("point2") },
    { num: "03", text: t("point3") },
    { num: "04", text: t("point4") },
    { num: "05", text: t("point5") },
  ];
  return (
    <section className="relative bg-background-alt overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(185,216,235,0.06)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="max-w-2xl mb-16">
          <SectionLabel text={t("sectionLabel")} />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark tracking-tight">
            {t("heading")}
          </h2>
        </AnimatedSection>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {painPoints.map((item) => (
            <motion.div
              key={item.num}
              variants={scaleIn}
              className="group relative bg-card border border-border rounded-2xl p-7 lg:p-8 hover:bg-card-hover hover:border-secondary/30 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                <span className="text-primary font-bold text-sm">{item.num}</span>
              </div>
              <p className="text-text-dark text-lg leading-relaxed relative z-10">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection className="mt-16 max-w-2xl">
          <p className="text-xl text-text-light leading-relaxed">{t("emphasis")}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
