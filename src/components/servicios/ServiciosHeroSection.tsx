"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

export default function ServiciosHeroSection() {
  const t = useTranslations("ServiciosHeroSection");
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,_rgba(185,216,235,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(28,71,97,0.25)_0%,_transparent_60%)]" />

      <div className="absolute top-0 left-[25%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-0">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel text={t("sectionLabel")} />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-text-dark tracking-tight leading-[1.1] mt-2"
          >
            {t("heading")}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg sm:text-xl text-text-light max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-center bg-secondary text-text-dark dark:text-[#0f172a] font-bold text-base px-8 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              {t("cta")}
            </Link>
          </motion.div>
          <motion.p variants={fadeInUp} className="mt-3 text-text-light text-sm text-center">
            {t("finePrint")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
