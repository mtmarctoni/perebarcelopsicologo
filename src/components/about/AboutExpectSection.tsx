import { useTranslations } from "next-intl";

import CheckIcon from "@/components/composables/CheckIcon";
import Reveal from "@/components/composables/Reveal";
import SectionLabel from "@/components/composables/SectionLabel";

export default function AboutExpectSection() {
  const t = useTranslations("AboutExpectSection");
  const expectations = [t("item1"), t("item2"), t("item3")];
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(28,71,97,0.2)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <Reveal className="text-center mb-16">
          <SectionLabel text={t("sectionLabel")} />
          <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
            {t("heading")}
          </h2>
        </Reveal>

        <Reveal stagger={0.12} className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {expectations.map((text) => (
            <div
              key={text}
              className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:bg-card-hover hover:border-secondary/20 transition-[background-color,border-color] duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <CheckIcon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-text-dark font-medium leading-relaxed">{text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.3} className="mt-12 text-center max-w-2xl mx-auto">
          <div className="p-6 rounded-2xl bg-secondary/10 border border-secondary/20">
            <p className="text-lg text-text-dark font-bold">{t("highlight")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
