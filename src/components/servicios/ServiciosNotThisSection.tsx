"use client";

import { motion } from "framer-motion";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

const notItems = [
  { text: "Motivacion o frases positivas", isFalse: true },
  { text: "Teoria sin aplicacion", isFalse: true },
  { text: "Tecnicas genericas", isFalse: true },
];

const yesItems = [
  { text: "No trabajamos 'como sentirte mejor'", isFalse: false },
  { text: "Trabajamos como rendir mejor incluso sin sentirte bien", isFalse: false },
];

export default function ServiciosNotThisSection() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <AnimatedSection>
              <SectionLabel text="Diferencia" />
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight leading-[1.1]">
                Que NO es esto
              </h2>
            </AnimatedSection>

            <motion.div
              className="mt-8 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
            >
              {notItems.map((item) => (
                <motion.div
                  key={item.text}
                  variants={fadeInUp}
                  className="flex items-center gap-4 p-5 rounded-xl bg-red-50 border border-red-100"
                >
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <svg
                      role="img"
                      aria-label="No es esto"
                      className="w-4 h-4 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <title>Eliminado</title>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-text-dark font-medium">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <AnimatedSection>
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight leading-[1.1] lg:mt-16">
                Esto es entrenamiento mental
                <br />
                <span className="text-secondary">aplicado a competicion real</span>
              </h2>
            </AnimatedSection>

            <motion.div
              className="mt-8 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
            >
              {yesItems.map((item) => (
                <motion.div
                  key={item.text}
                  variants={fadeInUp}
                  className="flex items-center gap-4 p-5 rounded-xl bg-secondary/5 border border-secondary/20"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                    <svg
                      role="img"
                      aria-label="Checkmark"
                      className="w-4 h-4 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <title>Checkmark</title>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-text-dark font-medium">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
