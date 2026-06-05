"use client";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";
import CalendlyBookingCard from "@/components/core/CalendlyBookingCard";

export default function ContactFormSection() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(245,158,11,0.04)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel text="Reserva" />
          <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
            Agenda tu sesion gratuita
          </h2>
          <p className="mt-4 text-lg text-text-light max-w-2xl mx-auto">
            Sin compromiso. Elige el dia y la hora que mejor te venga.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <CalendlyBookingCard />
        </AnimatedSection>
      </div>
    </section>
  );
}
