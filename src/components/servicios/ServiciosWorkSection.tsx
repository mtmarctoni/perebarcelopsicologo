"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

export default function ServiciosWorkSection() {
  const t = useTranslations("ServiciosWorkSection");
  const topics = [
    { title: t("topic1Title"), desc: t("topic1Desc"), icon: "01" },
    { title: t("topic2Title"), desc: t("topic2Desc"), icon: "02" },
    { title: t("topic3Title"), desc: t("topic3Desc"), icon: "03" },
    { title: t("topic4Title"), desc: t("topic4Desc"), icon: "04" },
  ];
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel text={t("sectionLabel")} />
          <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
            {t("heading")}
          </h2>
          <p className="mt-4 text-lg text-text max-w-2xl mx-auto">{t("subtitle")}</p>
        </AnimatedSection>

        <motion.div
          className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {topics.map((item) => (
            <motion.div
              key={item.icon}
              variants={fadeInUp}
              className="p-8 rounded-2xl bg-background-alt border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <span className="text-secondary/30 text-4xl font-bold">{item.icon}</span>
              <h3 className="text-xl font-bold text-text-dark mt-3">{item.title}</h3>
              <p className="text-text mt-2 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
