import { useTranslations } from "next-intl";

import Reveal from "@/components/composables/Reveal";

export default function ServiciosFaqSection() {
  const t = useTranslations("ServiciosFaqSection");
  const faqs = [
    { question: t("faq1Q"), answer: t("faq1A") },
    { question: t("faq2Q"), answer: t("faq2A") },
    { question: t("faq3Q"), answer: t("faq3A") },
  ];
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
            {t("sectionLabel")}
          </h2>
        </Reveal>

        <Reveal stagger={0.12} className="space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="p-8 rounded-2xl bg-background-alt border border-border shadow-xs"
            >
              <h3 className="text-xl font-bold text-text-dark">{faq.question}</h3>
              <p className="text-lg text-text mt-3 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
