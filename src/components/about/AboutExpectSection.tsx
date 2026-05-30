"use client";

import { motion } from "framer-motion";

import AnimatedSection from "@/components/composables/AnimatedSection";
import CheckIcon from "@/components/composables/CheckIcon";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

const expectations = [
  "No trabajamos sobre teoria, sino sobre lo que te pasa compitiendo",
  "Bajamos a tierra cada situacion",
  "Sales de cada sesion con acciones concretas",
];

export default function AboutExpectSection() {
  return (
    <section className="relative bg-[#070b14] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,_rgba(28,71,97,0.2)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel text="Expectativas" />
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Que puedes esperar al trabajar conmigo
          </h2>
        </AnimatedSection>

        <motion.div
          className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {expectations.map((text) => (
            <motion.div
              key={text}
              variants={fadeInUp}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-secondary/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <CheckIcon className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-white/80 font-medium leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection className="mt-12 text-center max-w-2xl mx-auto">
          <div className="p-6 rounded-2xl bg-secondary/10 border border-secondary/20">
            <p className="text-lg text-white font-bold">
              No se trata de entender mas. Se trata de saber que hacer cuando mas importa.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
