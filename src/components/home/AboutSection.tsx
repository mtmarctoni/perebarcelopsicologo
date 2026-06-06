"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import SectionLabel from "@/components/composables/SectionLabel";

export default function AboutSection() {
  const t = useTranslations("AboutSection");
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Decorative offset frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[2rem] border-2 border-secondary/30" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-secondary/20 rounded-tl-3xl" />

              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="/profile/pere1-transparente.webp"
                  alt={t("imageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <SectionLabel text={t("sectionLabel")} />
            <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
              {t("heading")}
            </h2>

            <div className="mt-8 space-y-5">
              <p className="text-lg text-text leading-relaxed">{t("bio1")}</p>
              <p className="text-lg text-text leading-relaxed">{t("bio2")}</p>
              <p className="text-lg text-text leading-relaxed">{t("bio3")}</p>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-primary-dark text-text-inverse">
              <p className="text-lg font-bold">{t("highlight")}</p>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center text-center bg-secondary text-text-dark dark:text-[#0f172a] font-bold px-8 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
              >
                {t("cta")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
