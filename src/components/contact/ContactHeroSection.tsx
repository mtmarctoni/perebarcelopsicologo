"use client";

import { motion } from "framer-motion";

import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

export default function ContactHeroSection() {
  return (
    <section className="relative bg-[#070b14] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(245,158,11,0.06)_0%,_transparent_60%)]" />
      <div className="absolute top-0 left-[30%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel text="Contacto" />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
          >
            Da el primer paso
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg sm:text-xl text-white/60 leading-relaxed"
          >
            Si sabes que puedes rendir mas pero algo te frena, hablemos. La primera sesion es
            gratuita y sin compromiso.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
