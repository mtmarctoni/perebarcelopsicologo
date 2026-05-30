"use client";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";
import CalendlyBookingCard from "@/components/core/CalendlyBookingCard";
import ContactForm from "@/components/core/Forms/ContactForm";

export default function ContactFormSection() {
  return (
    <section className="relative bg-[#070b14] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(245,158,11,0.04)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel text="Escribeme" />
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Cuentame tu caso
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Rellena el formulario o reserva directamente una llamada. Sin compromiso.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-8 items-start">
            <div className="bg-[#f8fafc] rounded-3xl shadow-2xl shadow-black/20 p-8 sm:p-12">
              <ContactForm />
            </div>
            <div className="bg-[#f8fafc] rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
              <CalendlyBookingCard />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
