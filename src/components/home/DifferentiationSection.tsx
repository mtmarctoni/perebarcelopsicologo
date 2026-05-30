"use client";

import { motion } from "framer-motion";

import AnimatedSection from "@/components/composables/AnimatedSection";
import CheckIcon from "@/components/composables/CheckIcon";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

const differentiators = [
  "Que hacer justo despues de un error",
  "Como actuar cuando aparecen dudas",
  "Como competir cuando hay presion",
  "Como rendir sin depender de sentirte perfecto",
];

export default function DifferentiationSection() {
  return (
    <section className="relative bg-[#0f172a] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_rgba(245,158,11,0.05)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <SectionLabel text="Diferencia" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Esto no es motivacion ni teoria
            </h2>
            <p className="mt-6 text-lg text-white/60 leading-relaxed">
              No vamos a trabajar en &ldquo;pensar en positivo&rdquo; ni en intentar controlar todo
              lo que pasa por tu cabeza. Porque eso es lo que hace que muchos deportistas se
              bloqueen mas.
            </p>
            <p className="mt-4 text-lg text-white/60 leading-relaxed">
              No necesitas eliminar los nervios.{" "}
              <strong className="text-white">Necesitas saber competir con ellos.</strong>
            </p>
          </AnimatedSection>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {differentiators.map((text) => (
              <motion.div
                key={text}
                variants={fadeInUp}
                className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-secondary/20 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                  <CheckIcon className="w-4 h-4 text-secondary" />
                </div>
                <p className="text-white/80 font-medium">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
