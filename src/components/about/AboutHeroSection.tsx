"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";
import { images } from "@/config/images";

export default function AboutHeroSection() {
  const t = useTranslations("AboutHeroSection");
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(185,216,235,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,_rgba(28,71,97,0.25)_0%,_transparent_60%)]" />

        <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <m.div
              className="lg:col-span-6"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp}>
                <SectionLabel text={t("sectionLabel")} />
              </m.div>

              <m.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-text-dark tracking-tight leading-[1.1] mt-2"
              >
                {t("heading")}
              </m.h1>

              <m.div variants={fadeInUp} className="mt-10 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center text-center bg-secondary text-text-dark dark:text-[#0f172a] font-bold text-base px-8 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t("cta")}
                </Link>
              </m.div>
            </m.div>

            <m.div
              className="lg:col-span-6 flex justify-center lg:justify-end"
              initial={{ opacity: 1, scale: 0.95, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div className="relative w-[280px] sm:w-[340px] lg:w-[380px]">
                <div className="absolute -inset-4 bg-secondary/10 rounded-[2rem] blur-2xl" />

                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border border-border">
                  <Image
                    src={images.profileGreen}
                    alt={t("imageAlt")}
                    fill
                    sizes="(max-width: 768px) 80vw, 380px"
                    className="object-cover object-top"
                    priority
                    fetchPriority="high"
                    decoding="sync"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/60 via-transparent to-transparent" />
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
