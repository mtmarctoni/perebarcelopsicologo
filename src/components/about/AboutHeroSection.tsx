import Image from "next/image";
import { useTranslations } from "next-intl";

import Reveal from "@/components/composables/Reveal";
import SectionLabel from "@/components/composables/SectionLabel";
import CTAButton from "@/components/ui/CTAButton";
import { images } from "@/config/images";

export default function AboutHeroSection() {
  const t = useTranslations("AboutHeroSection");
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(185,216,235,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(28,71,97,0.25)_0%,transparent_60%)]" />

      <div className="absolute top-0 right-[20%] w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <Reveal trigger="load" stagger={0.12} className="lg:col-span-6">
            <SectionLabel text={t("sectionLabel")} />

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-text-dark tracking-tight leading-[1.1] mt-2">
              {t("heading")}
            </h1>

            <div className="mt-10 text-center">
              <CTAButton href="/contact" location="about-hero">
                {t("cta")}
              </CTAButton>
            </div>
          </Reveal>

          <Reveal
            trigger="load"
            animation="fade-scale"
            delay={0.2}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-[280px] sm:w-[340px] lg:w-[380px]">
              <div className="absolute -inset-4 bg-secondary/10 rounded-[2rem] blur-2xl" />

              <div className="relative aspect-4/5 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border border-border">
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
                <div className="absolute inset-0 bg-linear-to-t from-[#070b14]/60 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
