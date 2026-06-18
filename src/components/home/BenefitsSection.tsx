"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/composables/AnimatedSection";
import CheckIcon from "@/components/composables/CheckIcon";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

export default function BenefitsSection() {
  const t = useTranslations("BenefitsSection");
  const benefits = [t("benefit1"), t("benefit2"), t("benefit3"), t("benefit4"), t("benefit5")];
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: heading + CTA */}
          <AnimatedSection className="lg:sticky lg:top-32 text-center">
            <SectionLabel text={t("sectionLabel")} />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark tracking-tight leading-[1.1]">
              {t("heading")}
            </h2>
            <p className="mt-6 text-lg text-text leading-relaxed max-w-md mx-auto">
              {t("subtitle")}
            </p>
            <div className="mt-10 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center text-center bg-primary-dark text-text-inverse font-semibold px-8 py-4 rounded-full hover:bg-secondary hover:text-text-dark dark:hover:text-[#0f172a] hover:shadow-glow transition-all duration-300"
              >
                {t("cta")}
              </Link>
            </div>
          </AnimatedSection>

          {/* Right: benefits list */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {benefits.map((text) => (
              <motion.div
                key={text}
                variants={fadeInUp}
                className="flex items-start gap-5 p-6 rounded-2xl bg-background-alt border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                  <CheckIcon className="w-6 h-6 text-primary group-hover:text-text-dark transition-colors duration-300" />
                </div>
                <p className="text-lg font-medium text-text-dark leading-relaxed pt-2">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
