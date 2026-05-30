"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import AnimatedSection from "@/components/composables/AnimatedSection";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";
import { clubs } from "@/utils/data";

export default function AboutClubsSection() {
  return (
    <section className="relative bg-[#0f172a] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(245,158,11,0.06)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
          <SectionLabel text="Experiencia" />
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            He trabajado con deportistas de diferentes disciplinas y niveles competitivos.
          </h2>
        </AnimatedSection>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {clubs.map((club) => (
            <motion.div
              key={club.name}
              variants={fadeInUp}
              className="group flex flex-col items-center p-4 sm:p-5 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] hover:border-secondary/30 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 transition-transform duration-500 group-hover:scale-110">
                <Image
                  src={club.imgUrl}
                  alt={club.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 64px, 80px"
                />
              </div>
              <span className="text-xs sm:text-sm text-center font-medium text-white/60 group-hover:text-white/90 transition-colors duration-300 line-clamp-2 leading-snug">
                {club.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection className="mt-16 max-w-2xl mx-auto text-center">
          <p className="text-xl text-white/50 leading-relaxed">
            Cada caso es distinto. Pero el patron suele repetirse:
          </p>
          <p className="text-xl text-white/90 font-bold mt-3">
            Entrenan bien.
            <br />
            Pero compitiendo no rinden igual.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
