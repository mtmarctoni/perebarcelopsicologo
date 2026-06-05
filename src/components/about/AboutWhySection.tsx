"use client";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";

export default function AboutWhySection() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-text-dark opacity-[0.02] select-none pointer-events-none">
        ?
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimatedSection>
            <SectionLabel text="Motivacion" />
            <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight leading-[1.1]">
              Por que hago esto
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="space-y-5">
              <p className="text-lg text-text leading-relaxed">
                He visto a muchos deportistas con nivel quedarse lejos de su rendimiento real.
              </p>
              <p className="text-lg text-text leading-relaxed">
                No por falta de entrenamiento. No por falta de talento.
              </p>
              <p className="text-lg text-text leading-relaxed">
                Sino por no saber gestionar lo que pasa en su cabeza cuando compiten.
              </p>
              <div className="mt-8 p-6 rounded-2xl bg-primary-dark text-text-inverse">
                <p className="text-lg font-bold">
                  Ahi es donde se pierde mucho mas de lo que parece. Y ahi es donde tiene sentido
                  trabajar.
                </p>
              </div>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-secondary text-text-dark font-bold px-8 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                >
                  Detecta que te esta limitando
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
