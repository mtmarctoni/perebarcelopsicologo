"use client";

import { motion } from "framer-motion";

import AnimatedSection from "@/components/composables/AnimatedSection";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

const faqs = [
  {
    question: "Y si no me funciona?",
    answer: "La primera sesion es 100% gratuita. Sin ningun tipo de compromiso.",
  },
  {
    question: "Esto sirve para mi deporte?",
    answer: "El proceso se adapta a cada disciplina.",
  },
  {
    question: "Cuanto tiempo se tarda en notar cambios?",
    answer:
      "Depende del caso, pero desde las primeras sesiones ya trabajas herramientas aplicables.",
  },
];

export default function ServiciosFaqSection() {
  return (
    <section className="relative bg-[#f8fafc] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0f172a] tracking-tight">
            Preguntas frecuentes
          </h2>
        </AnimatedSection>

        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.question}
              variants={fadeInUp}
              className="p-8 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm"
            >
              <h3 className="text-xl font-bold text-[#0f172a]">{faq.question}</h3>
              <p className="text-lg text-[#475569] mt-3 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
