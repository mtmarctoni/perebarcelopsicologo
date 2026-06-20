"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { useTranslations } from "next-intl";

import CheckIcon from "@/components/composables/CheckIcon";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

export default function ServiciosTakeawaysSection() {
  const t = useTranslations("ServiciosTakeawaysSection");
  const takeaways = [t("item1"), t("item2"), t("item3"), t("item4")];
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(185,216,235,0.06)_0%,_transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <m.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionLabel text={t("sectionLabel")} />
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight leading-[1.1]">
                {t("heading")}
              </h2>
              <p className="mt-6 text-lg text-text-light leading-relaxed max-w-md">
                {t("subtitle")}
              </p>
            </m.div>

            <m.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
            >
              {takeaways.map((text) => (
                <m.div
                  key={text}
                  variants={fadeInUp}
                  className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:bg-card-hover hover:border-secondary/20 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                    <CheckIcon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-text font-medium">{text}</p>
                </m.div>
              ))}
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
