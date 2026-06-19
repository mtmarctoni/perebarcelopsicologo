"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

import AnimatedSection from "@/components/composables/AnimatedSection";
import { staggerDelay } from "@/components/home/animations";

export default function ServiciosFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("ServiciosFaqSection");
  const faqs = [
    { question: t("faq1Q"), answer: t("faq1A") },
    { question: t("faq2Q"), answer: t("faq2A") },
    { question: t("faq3Q"), answer: t("faq3A") },
  ];

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleKeyDown = useCallback(
    (index: number) => (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle(index);
      }
    },
    [toggle],
  );

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
            {t("sectionLabel")}
          </h2>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div
                key={faq.question}
                className="opacity-0 animate-fade-in-up rounded-2xl bg-background-alt border border-border shadow-sm overflow-hidden"
                style={{ animationDelay: `${staggerDelay(i, 0.1, 0.12)}ms` }}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggle(i)}
                    onKeyDown={handleKeyDown(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left cursor-pointer"
                  >
                    <span className="text-xl font-bold text-text-dark pr-4">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 shrink-0 text-text-light transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </h3>
                <section
                  id={panelId}
                  aria-labelledby={buttonId}
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 sm:px-8 pb-6 sm:pb-8 text-lg text-text leading-relaxed">
                    {faq.answer}
                  </p>
                </section>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
