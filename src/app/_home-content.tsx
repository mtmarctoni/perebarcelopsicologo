"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import MainLayout from "@/components/core/MainLayout";

/* ------------------------------------------------------------------ */
/*  Animation variants                                               */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function AnimatedSection({
  children,
  className = "",
  variants = fadeInUp,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: typeof fadeInUp;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="Checkmark"
      className={`shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <title>Checkmark</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <span className="inline-block text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-4">
      {text}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page content                                                      */
/* ------------------------------------------------------------------ */

export default function HomeContent() {
  return (
    <MainLayout>
      {/* ============================================================== */}
      {/* HERO                                                           */}
      {/* ============================================================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#070b14]">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(245,158,11,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,_rgba(28,71,97,0.25)_0%,_transparent_60%)]" />

        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Decorative diagonal line */}
        <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 right-[35%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent hidden lg:block" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[85vh]">
            {/* Text column */}
            <motion.div
              className="lg:col-span-6 xl:col-span-5 order-2 lg:order-1"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <SectionLabel text="Psicologia deportiva de alto rendimiento" />
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-[2.6rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-white leading-[1.1] tracking-tight mt-2"
              >
                Entrenas bien.
                <br />
                Pero cuando{" "}
                <span className="text-secondary relative">
                  compites
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <title>Underline decoration</title>
                    <path
                      d="M2 8C50 2 150 2 198 8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="text-secondary/60"
                    />
                  </svg>
                </span>
                , algo cambia.
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-7 text-lg sm:text-xl text-white/60 max-w-md leading-relaxed"
              >
                Rindes peor, dudas mas o te bloqueas en momentos clave. No es falta de nivel. Es
                como gestionas la presion.
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-secondary text-[#0f172a] font-bold text-base px-8 py-4 rounded-full hover:bg-secondary-light hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Quiero saber que me esta bloqueando
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center text-white/80 font-medium text-base px-8 py-4 rounded-full border border-white/15 hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                >
                  Ver como trabajo
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/40 text-sm"
              >
                <span className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-secondary" />
                  Sesion inicial gratuita
                </span>
                <span className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-secondary" />
                  100% personalizado
                </span>
                <span className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-secondary" />
                  Online
                </span>
              </motion.div>
            </motion.div>

            {/* Image column */}
            <motion.div
              className="lg:col-span-6 xl:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div className="relative w-[280px] sm:w-[340px] lg:w-[420px] xl:w-[480px]">
                {/* Decorative amber glow behind image */}
                <div className="absolute -inset-4 bg-secondary/10 rounded-[2rem] blur-2xl" />
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary/8 rounded-full blur-3xl" />

                {/* Main image container with asymmetric frame */}
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border border-white/5">
                  <Image
                    src="/wp/home-hero.webp"
                    alt="Pere Barcelo - Psicologo Deportivo"
                    fill
                    sizes="(max-width: 768px) 80vw, 480px"
                    className="object-cover object-top"
                    priority
                  />
                  {/* Bottom gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/60 via-transparent to-transparent" />
                </div>

                {/* Floating stat card */}
                <motion.div
                  className="absolute -left-6 sm:-left-10 bottom-12 bg-[#0f172a]/90 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <p className="text-2xl font-bold text-white">+10</p>
                  <p className="text-xs text-white/50 mt-0.5">anos de experiencia</p>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -right-4 sm:-right-6 top-16 bg-secondary/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <p className="text-xs font-bold text-[#0f172a] uppercase tracking-wide">
                    Alto rendimiento
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span className="text-white/30 text-xs uppercase tracking-widest">Descubre mas</span>
          <motion.div
            className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-1 h-2 bg-secondary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <main>
        {/* ============================================================== */}
        {/* PAIN POINTS — "Para quien es"                                   */}
        {/* ============================================================== */}
        <section className="relative bg-[#0f172a] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(245,158,11,0.06)_0%,_transparent_60%)]" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
            <AnimatedSection className="max-w-2xl mb-16">
              <SectionLabel text="Para ti" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Esto es para ti si al competir...
              </h2>
            </AnimatedSection>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
            >
              {[
                {
                  num: "01",
                  text: "Empiezas bien, pero tras un error te vienes abajo",
                },
                {
                  num: "02",
                  text: "Aparecen dudas que no tienes entrenando",
                },
                {
                  num: "03",
                  text: "Te notas mas tenso y menos fluido",
                },
                {
                  num: "04",
                  text: "Piensas demasiado en lugar de competir",
                },
                {
                  num: "05",
                  text: "Sientes que podrias rendir mas, pero algo falla",
                },
              ].map((item) => (
                <motion.div
                  key={item.num}
                  variants={scaleIn}
                  className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 lg:p-8 hover:bg-white/[0.06] hover:border-secondary/30 hover:-translate-y-1 transition-all duration-500"
                >
                  <span className="text-secondary/40 text-5xl font-bold absolute top-6 right-6 select-none">
                    {item.num}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                    <span className="text-secondary font-bold text-sm">{item.num}</span>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed relative z-10">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

            <AnimatedSection className="mt-16 max-w-2xl">
              <p className="text-xl text-white/50 leading-relaxed">
                No es falta de nivel.{" "}
                <strong className="text-white/90">
                  Es como gestionas lo que pasa en tu cabeza cuando compites.
                </strong>
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ============================================================== */}
        {/* BENEFITS — "Que conseguiras"                                    */}
        {/* ============================================================== */}
        <section className="relative bg-[#f8fafc] overflow-hidden">
          {/* Large background numeral */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-[#0f172a]/[0.02] select-none pointer-events-none">
            05
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              {/* Left: heading + CTA */}
              <AnimatedSection className="lg:sticky lg:top-32">
                <SectionLabel text="Resultados" />
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f172a] tracking-tight leading-[1.1]">
                  Que
                  <br />
                  <span className="text-secondary">conseguiras</span>
                </h2>
                <p className="mt-6 text-lg text-[#475569] leading-relaxed max-w-md">
                  Herramientas concretas para aplicar desde la primera sesion. Sin teorias
                  abstractas.
                </p>
                <div className="mt-10">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-[#0f172a] text-white font-semibold px-8 py-4 rounded-full hover:bg-secondary hover:text-[#0f172a] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300"
                  >
                    Quiero mejorar mi rendimiento
                  </Link>
                </div>
              </AnimatedSection>

              {/* Right: benefits list */}
              <motion.div
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={staggerContainer}
              >
                {[
                  "Competiras al nivel al que entrenas",
                  "Sabras que hacer despues de un error",
                  "Tendras mas control en momentos clave",
                  "Tu confianza dejara de depender del resultado",
                  "Competiras bien incluso sin sensaciones perfectas",
                ].map((text) => (
                  <motion.div
                    key={text}
                    variants={fadeInUp}
                    className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                      <CheckIcon className="w-6 h-6 text-secondary group-hover:text-[#0f172a] transition-colors duration-300" />
                    </div>
                    <p className="text-lg font-medium text-[#0f172a] leading-relaxed pt-2">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* PROCESS — "Como trabajaremos"                                   */}
        {/* ============================================================== */}
        <section className="relative bg-[#070b14] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(28,71,97,0.2)_0%,_transparent_60%)]" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
            <AnimatedSection className="text-center mb-20">
              <SectionLabel text="Metodologia" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Como <span className="text-secondary">trabajaremos</span>
              </h2>
            </AnimatedSection>

            <div className="relative">
              {/* Connecting line (desktop) */}
              <div className="absolute top-[3.25rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent hidden lg:block" />

              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={staggerContainer}
              >
                {[
                  {
                    step: "1",
                    title: "Entendemos tu caso",
                    desc: "Analizamos que te esta pasando realmente en competicion",
                  },
                  {
                    step: "2",
                    title: "Detectamos el bloqueo",
                    desc: "Identificamos que esta fallando exactamente",
                  },
                  {
                    step: "3",
                    title: "Plan practico",
                    desc: "Herramientas concretas para aplicar compitiendo",
                  },
                  {
                    step: "4",
                    title: "Seguimiento",
                    desc: "Ajustamos y llevamos el trabajo a competicion",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.step}
                    variants={fadeInUp}
                    className="relative text-center lg:text-left"
                  >
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary font-bold text-xl z-10 relative">
                          {item.step}
                        </div>
                        {/* Glow behind step number */}
                        <div className="absolute inset-0 bg-secondary/20 rounded-2xl blur-lg" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mt-1 lg:mt-0">{item.title}</h3>
                        <p className="text-white/50 mt-2 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* DIFFERENTIATION — "Esto no es lo mismo"                         */}
        {/* ============================================================== */}
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
                  No vamos a trabajar en "pensar en positivo" ni en intentar controlar todo lo que
                  pasa por tu cabeza. Porque eso es lo que hace que muchos deportistas se bloqueen
                  mas.
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
                {[
                  "Que hacer justo despues de un error",
                  "Como actuar cuando aparecen dudas",
                  "Como competir cuando hay presion",
                  "Como rendir sin depender de sentirte perfecto",
                ].map((text) => (
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

        {/* ============================================================== */}
        {/* ABOUT — "Quien soy"                                             */}
        {/* ============================================================== */}
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
                    Mi enfoque es practico: desde la primera sesion sabes exactamente que hacer
                    cuando compites.
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

        {/* ============================================================== */}
        {/* FINAL CTA                                                       */}
        {/* ============================================================== */}
        <section className="relative bg-[#070b14] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(245,158,11,0.08)_0%,_transparent_70%)]" />

          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32 text-center">
            <AnimatedSection>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                Deja de perder rendimiento
                <br />
                <span className="text-secondary">por lo que pasa en tu cabeza</span>
              </h2>
              <p className="mt-8 text-xl text-white/50 max-w-xl mx-auto">
                La primera sesion es gratuita. Descubre que te esta limitando y empieza a competir
                al nivel que te mereces.
              </p>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-secondary text-[#0f172a] text-lg font-bold px-10 py-5 rounded-full hover:bg-secondary-light hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                  Pide tu sesion gratuita
                </Link>
              </div>
              <p className="mt-4 text-white/30 text-sm">Sin compromiso. Sin coste.</p>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
