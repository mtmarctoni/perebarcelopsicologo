"use client";

import { motion } from "framer-motion";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";
import { scaleIn, staggerContainer } from "@/components/home/animations";

const painPoints = [
  { num: "01", text: "Empiezas bien, pero un error cambia tu rendimiento" },
  { num: "02", text: "Aparecen dudas que no tienes entrenando" },
  { num: "03", text: "Te tensas y pierdes fluidez" },
  { num: "04", text: "Piensas demasiado en vez de competir" },
  { num: "05", text: "Tu confianza depende del resultado o del momento" },
];

export default function ServiciosPainSection() {
  return (
    <section className="relative bg-background-alt overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,_rgba(245,158,11,0.06)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="max-w-2xl mb-16">
          <SectionLabel text="Para ti" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark tracking-tight">
            Te pasa esto cuando compites?
          </h2>
        </AnimatedSection>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {painPoints.map((item) => (
            <motion.div
              key={item.num}
              variants={scaleIn}
              className="group relative bg-card border border-border rounded-2xl p-7 lg:p-8 hover:bg-card-hover hover:border-secondary/30 hover:-translate-y-1 transition-all duration-500"
            >
              <span className="text-secondary/40 text-5xl font-bold absolute top-6 right-6 select-none">
                {item.num}
              </span>
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                <span className="text-secondary font-bold text-sm">{item.num}</span>
              </div>
              <p className="text-text text-lg leading-relaxed relative z-10">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection className="mt-16 max-w-2xl">
          <p className="text-xl text-text-light leading-relaxed">
            No es falta de nivel.{" "}
            <strong className="text-text-dark">Es gestion del rendimiento bajo presion.</strong>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
