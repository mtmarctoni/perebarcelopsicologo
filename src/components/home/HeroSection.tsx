"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import CheckIcon from "@/components/composables/CheckIcon";
import SectionLabel from "@/components/composables/SectionLabel";
import { staggerDelay } from "@/components/home/animations";
import { images } from "@/config/images";

export default function HeroSection() {
  const t = useTranslations("HeroSection");
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(185,216,235,0.08)_0%,_transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,_rgba(28,71,97,0.25)_0%,_transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-border to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-[35%] w-px h-full bg-gradient-to-b from-transparent via-card to-transparent hidden lg:block"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:pt-24 lg:pb-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[85vh]">
          <div className="lg:col-span-6 xl:col-span-5 order-2 lg:order-1">
            <div
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${staggerDelay(0)}ms` }}
            >
              <SectionLabel text={t("sectionLabel")} />
            </div>

            <h1
              className="opacity-0 animate-fade-in-up text-[2.6rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-text-dark leading-[1.1] tracking-tight mt-2"
              style={{ animationDelay: `${staggerDelay(1)}ms` }}
            >
              {t("headingLine1")}
              <br />
              {t("headingBeforeHighlight")}
              <span className="text-primary relative">
                {t("headingHighlight")}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <title>Underline decoration</title>
                  <path
                    d="M2 8C50 2 150 2 198 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-60"
                  />
                </svg>
              </span>
              {t("headingLine2")}
            </h1>

            <p
              className="opacity-0 animate-fade-in-up mt-7 text-lg sm:text-xl text-text-light max-w-md leading-relaxed"
              style={{ animationDelay: `${staggerDelay(2)}ms` }}
            >
              {t("subtitle")}
            </p>

            <div
              className="opacity-0 animate-fade-in-up mt-10 flex flex-col sm:flex-row gap-4"
              style={{ animationDelay: `${staggerDelay(3)}ms` }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center text-center bg-secondary text-text-dark dark:text-[#0f172a] font-bold text-base px-8 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
              >
                {t("ctaPrimary")}
              </Link>
            </div>

            <div
              className="opacity-0 animate-fade-in-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-text-dark opacity-40 text-sm"
              style={{ animationDelay: `${staggerDelay(4)}ms` }}
            >
              <span className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-primary" />
                {t("checkFreeSession")}
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-primary" />
                {t("checkPersonalized")}
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-primary" />
                {t("checkOnline")}
              </span>
            </div>
          </div>

          <div
            className="lg:col-span-6 xl:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-end opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms", animationDuration: "1s" }}
          >
            <div className="relative w-[280px] sm:w-[340px] lg:w-[420px] xl:w-[480px]">
              <div
                aria-hidden="true"
                className="absolute -inset-4 bg-secondary/10 rounded-[2rem] blur-2xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary/8 rounded-full blur-3xl"
              />

              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border border-border">
                <Image
                  src={images.heroHome}
                  alt={t("heroImageAlt")}
                  fill
                  sizes="(max-width: 768px) 80vw, 480px"
                  className="object-cover object-top"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#070b14]/60 via-transparent to-transparent"
                />
              </div>

              <div
                className="opacity-0 animate-fade-in-up absolute -left-6 sm:-left-10 bottom-12 bg-background-alt backdrop-blur-md border border-border rounded-2xl px-5 py-4 shadow-xl"
                style={{ animationDelay: "800ms" }}
              >
                <p className="text-2xl font-bold text-text-dark">{t("statNumber")}</p>
                <p className="text-xs text-text-light mt-0.5">{t("statLabel")}</p>
              </div>

              <div
                className="opacity-0 animate-fade-in-up absolute -right-4 sm:-right-6 top-16 bg-secondary/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
                style={{ animationDelay: "1000ms" }}
              >
                <p className="text-xs font-bold text-text-dark uppercase tracking-wide">
                  {t("badgeText")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in"
        style={{ animationDelay: "1400ms" }}
      >
        <span className="text-text-dark opacity-30 text-xs uppercase tracking-widest">
          {t("scrollIndicator")}
        </span>
        <div className="w-5 h-8 border-2 border-border rounded-full flex justify-center pt-1.5 animate-bounce-down">
          <div className="w-1 h-2 bg-secondary rounded-full" />
        </div>
      </div>
    </section>
  );
}
