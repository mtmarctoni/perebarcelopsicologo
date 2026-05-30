"use client";

import { motion } from "framer-motion";

import CheckIcon from "@/components/composables/CheckIcon";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

const takeaways = [
  "Que hacer justo despues de un error",
  "Como gestionar pensamientos en competicion",
  "Como competir con presion sin bloquearte",
  "Como construir una confianza mas estable",
];

export default function ServiciosTakeawaysSection() {
  return (
    <section className="relative bg-[#070b14] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(245,158,11,0.06)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel text="Resultados" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Que vas a llevar
            </h2>
            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-md">
              No es teoria, es aplicacion directa. Herramientas que puedes usar desde la primera
              sesion.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {takeaways.map((text) => (
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
