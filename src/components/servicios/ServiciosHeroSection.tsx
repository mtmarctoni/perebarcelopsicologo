import { useTranslations } from "next-intl";

import Reveal from "@/components/composables/Reveal";
import SectionLabel from "@/components/composables/SectionLabel";
import CTAButton from "@/components/ui/CTAButton";

export default function ServiciosHeroSection() {
  const t = useTranslations("ServiciosHeroSection");
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(185,216,235,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(28,71,97,0.25)_0%,transparent_60%)]" />

      <div className="absolute top-0 left-[25%] w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-0">
        <Reveal trigger="load" stagger={0.12} className="max-w-3xl mx-auto text-center">
          <SectionLabel text={t("sectionLabel")} />

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-text-dark tracking-tight leading-[1.1] mt-2">
            {t("heading")}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-text-light max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="mt-10 text-center">
            <CTAButton href="/contact" location="servicios-hero">
              {t("cta")}
            </CTAButton>
          </div>
          <p className="mt-3 text-text-light text-sm text-center">{t("finePrint")}</p>
        </Reveal>
      </div>
    </section>
  );
}
