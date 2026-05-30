"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import SectionLabel from "@/components/composables/SectionLabel";

export default function AboutSection() {
  return (
    <section className="relative bg-[#f8fafc] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Decorative offset frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[2rem] border-2 border-secondary/30" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-secondary/20 rounded-tl-3xl" />

              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="/wp/profile-photo.webp"
                  alt="Pere Barcelo - Psicologo Deportivo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <SectionLabel text="Sobre mi" />
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0f172a] tracking-tight">
              Quien soy
            </h2>

            <div className="mt-8 space-y-5">
              <p className="text-xl text-[#0f172a] font-medium leading-relaxed">
                Soy Pere Barcelo, psicologo deportivo.
              </p>
              <p className="text-lg text-[#475569] leading-relaxed">
                Trabajo con deportistas que entrenan bien pero no consiguen rendir igual en
                competicion.
              </p>
              <p className="text-lg text-[#475569] leading-relaxed">
                Mi enfoque es practico: desde la primera sesion sabes exactamente que hacer cuando
                compites.
              </p>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-[#0f172a] text-white">
              <p className="text-lg font-bold">
                No necesitas mas entrenamiento. Necesitas entrenar tu mente.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-secondary text-[#0f172a] font-bold px-8 py-4 rounded-full hover:bg-secondary-light hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Reserva tu sesion gratuita
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
