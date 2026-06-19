"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import SectionLabel from "@/components/composables/SectionLabel";
import { staggerDelay } from "@/components/home/animations";
import { images } from "@/config/images";

export default function AboutHeroSection() {
  const t = useTranslations("AboutHeroSection");
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(185,216,235,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,_rgba(28,71,97,0.25)_0%,_transparent_60%)]" />

      <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <div
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${staggerDelay(0)}ms` }}
            >
              <SectionLabel text={t("sectionLabel")} />
            </div>

            <h1
              className="opacity-0 animate-fade-in-up text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-text-dark tracking-tight leading-[1.1] mt-2"
              style={{ animationDelay: `${staggerDelay(1)}ms` }}
            >
              {t("heading")}
            </h1>

            <div
              className="opacity-0 animate-fade-in-up mt-10"
              style={{ animationDelay: `${staggerDelay(2)}ms` }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center text-center bg-secondary text-text-dark dark:text-[#0f172a] font-bold text-base px-8 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
              >
                {t("cta")}
              </Link>
            </div>
          </div>

          <div
            className="lg:col-span-6 flex justify-center lg:justify-end opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms", animationDuration: "800ms" }}
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
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
