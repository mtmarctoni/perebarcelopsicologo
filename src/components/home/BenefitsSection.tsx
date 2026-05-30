"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import AnimatedSection from "@/components/composables/AnimatedSection";
import CheckIcon from "@/components/composables/CheckIcon";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

const benefits = [
  "Competiras al nivel al que entrenas",
  "Sabras que hacer despues de un error",
  "Tendras mas control en momentos clave",
  "Tu confianza dejara de depender del resultado",
  "Competiras bien incluso sin sensaciones perfectas",
];

export default function BenefitsSection() {
  return (
    <section className="relative bg-[#f8fafc] overflow-hidden">
      {/* Large background numeral */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-[#0f172a]/[0.02] select-none pointer-events-none">
        05
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: heading + CTA */}
          <AnimatedSection className="lg:sticky lg:top-32">
            <SectionLabel text="Resultados" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f172a] tracking-tight leading-[1.1]">
              Que
              <br />
              <span className="text-secondary">conseguiras</span>
            </h2>
            <p className="mt-6 text-lg text-[#475569] leading-relaxed max-w-md">
              Herramientas concretas para aplicar desde la primera sesion. Sin teorias abstractas.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#0f172a] text-white font-semibold px-8 py-4 rounded-full hover:bg-secondary hover:text-[#0f172a] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300"
              >
                Quiero mejorar mi rendimiento
              </Link>
            </div>
          </AnimatedSection>

          {/* Right: benefits list */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {benefits.map((text) => (
              <motion.div
                key={text}
                variants={fadeInUp}
                className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                  <CheckIcon className="w-6 h-6 text-secondary group-hover:text-[#0f172a] transition-colors duration-300" />
                </div>
                <p className="text-lg font-medium text-[#0f172a] leading-relaxed pt-2">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
