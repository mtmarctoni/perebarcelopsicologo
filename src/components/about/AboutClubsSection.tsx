"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";
import { clubs } from "@/utils/clubs";

export default function AboutClubsSection() {
  const t = useTranslations("AboutClubsSection");
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative bg-background-alt overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(185,216,235,0.06)_0%,_transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
          <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
            <SectionLabel text={t("sectionLabel")} />
            <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
              {t("heading")}
            </h2>
          </AnimatedSection>

          <m.div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {clubs.map((club) => (
              <m.div
                key={club.name}
                variants={fadeInUp}
                className="group flex flex-col items-center p-4 sm:p-5 bg-card backdrop-blur-sm rounded-2xl border border-border hover:border-secondary/30 hover:bg-card-hover hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={club.imgUrl}
                    alt={club.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 64px, 80px"
                  />
                </div>
                <span className="text-xs sm:text-sm text-center font-medium text-text-light group-hover:text-text-dark transition-colors duration-300 leading-snug">
                  {club.name}
                </span>
              </m.div>
            ))}
          </m.div>

          <AnimatedSection className="mt-16 max-w-2xl mx-auto text-center">
            <p className="text-xl text-text-light leading-relaxed">{t("closing")}</p>
            <p className="text-xl text-text-dark font-bold mt-3">{t("closingBold")}</p>
          </AnimatedSection>
        </div>
      </section>
    </LazyMotion>
  );
}
