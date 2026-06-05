"use client";

import { motion } from "framer-motion";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

const steps = [
  {
    step: "1",
    title: "Analizamos situaciones concretas de competicion",
    desc: "No hablamos en general. Trabajamos tu caso real.",
  },
  {
    step: "2",
    title: "Detectamos que te esta limitando",
    desc: "Identificamos patrones y desencadenantes especificos.",
  },
  {
    step: "3",
    title: "Definimos herramientas aplicables",
    desc: "Acciones concretas que puedes usar en competicion.",
  },
  {
    step: "4",
    title: "Te llevas acciones claras para competicion",
    desc: "Sales sabiendo que hacer en cada momento.",
  },
];

export default function ServiciosSessionSection() {
  return (
    <section className="relative bg-background-alt overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,_rgba(28,71,97,0.15)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel text="Proceso" />
          <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
            Como es una <span className="text-secondary">sesion</span>
          </h2>
          <p className="mt-4 text-lg text-text-light max-w-xl mx-auto">
            En cada sesion trabajamos tu caso real.
          </p>
        </AnimatedSection>

        <motion.div
          className="space-y-6 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {steps.map((item) => (
            <motion.div
              key={item.step}
              variants={fadeInUp}
              className="flex gap-5 p-6 rounded-2xl bg-card border border-border hover:border-secondary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary font-bold text-lg shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-dark">{item.title}</h3>
                <p className="text-text-light mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection className="mt-12 text-center">
          <p className="text-lg text-text font-medium">Sales sabiendo que hacer en cada momento.</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
