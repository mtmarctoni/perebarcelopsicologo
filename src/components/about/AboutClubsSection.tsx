import Image from "next/image";
import { useTranslations } from "next-intl";

import Reveal from "@/components/composables/Reveal";
import SectionLabel from "@/components/composables/SectionLabel";
import { clubs } from "@/utils/data";

export default function AboutClubsSection() {
  const t = useTranslations("AboutClubsSection");
  return (
    <section className="relative bg-background-alt overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(185,216,235,0.06)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <Reveal className="text-center mb-16 max-w-3xl mx-auto">
          <SectionLabel text={t("sectionLabel")} />
          <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
            {t("heading")}
          </h2>
        </Reveal>

        <Reveal
          stagger={0.08}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {clubs.map((club) => (
            <div
              key={club.name}
              className="group flex flex-col items-center p-4 sm:p-5 bg-card backdrop-blur-xs rounded-2xl border border-border hover:border-secondary/30 hover:bg-card-hover hover:-translate-y-1 transition-[background-color,border-color,transform] duration-500"
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
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.3} className="mt-16 max-w-2xl mx-auto text-center">
          <p className="text-xl text-text-light leading-relaxed">{t("closing")}</p>
          <p className="text-xl text-text-dark font-bold mt-3">{t("closingBold")}</p>
        </Reveal>
      </div>
    </section>
  );
}
