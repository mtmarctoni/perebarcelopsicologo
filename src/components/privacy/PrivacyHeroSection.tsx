import { useTranslations } from "next-intl";

import Reveal from "@/components/composables/Reveal";
import SectionLabel from "@/components/composables/SectionLabel";

export default function PrivacyHeroSection() {
  const t = useTranslations("PrivacyHeroSection");
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(185,216,235,0.06)_0%,transparent_60%)]" />
      <div className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <Reveal trigger="load" stagger={0.12} className="text-center max-w-2xl mx-auto">
          <SectionLabel text={t("sectionLabel")} />

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark tracking-tight leading-[1.1]">
            {t("heading")}
          </h1>

          <p className="mt-6 text-lg text-text-light leading-relaxed">{t("subtitle")}</p>
        </Reveal>
      </div>
    </section>
  );
}
