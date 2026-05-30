import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { createPageMetadata } from "@/app/metadata";
import SectionContainer from "@/components/containers/SectionContainer";
import MainLayout from "@/components/core/MainLayout";

export const metadata: Metadata = createPageMetadata({
  title: "Psicólogo deportivo | Pere Barceló",
  description:
    "Entrenas bien. Pero cuando compites, algo cambia. Psicología deportiva para competir al nivel al que entrenas, incluso bajo presión.",
  path: "/",
  imagePath: "/wp/home-hero.webp",
});

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Entrenas bien. Pero cuando compites,{" "}
            <span className="text-secondary">algo cambia.</span>
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-white/80 max-w-2xl mx-auto">
            Rindes peor, dudas más o te bloqueas en momentos clave.
          </p>
          <p className="mt-4 text-lg text-white/90 font-medium max-w-xl mx-auto">
            Te ayudo a competir al nivel al que entrenas, incluso bajo presión.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-white/90 text-sm">
              <span className="flex items-center gap-1.5">
                <svg
                  role="img"
                  aria-label="Checkmark"
                  className="w-4 h-4 text-secondary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <title>Checkmark</title>
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Sesión inicial gratuita
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  role="img"
                  aria-label="Checkmark"
                  className="w-4 h-4 text-secondary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <title>Checkmark</title>
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Trabajo 100% personalizado
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  role="img"
                  aria-label="Checkmark"
                  className="w-4 h-4 text-secondary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <title>Checkmark</title>
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Online desde cualquier lugar
              </span>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/contact">
              <button
                type="button"
                className="bg-secondary text-primary-dark text-lg font-bold px-10 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow hover:scale-105 transition-all duration-300"
              >
                Quiero saber qué me está bloqueando
              </button>
            </Link>
          </div>
          <p className="mt-4 text-white/60 text-sm font-medium">
            Sin compromiso. Detecta qué te está limitando.
          </p>
        </div>
      </section>

      <main>
        {/* Hero Image */}
        <SectionContainer className="bg-background">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/wp/home-hero.webp"
                alt="Pere Barceló - Psicólogo Deportivo"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </SectionContainer>

        {/* Para quien es */}
        <SectionContainer className="bg-background-alt/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
                Para ti
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark mt-3 tracking-tight">
                ¿Para quién es?
              </h2>
            </div>
            <h3 className="text-2xl font-bold text-text-dark mb-6">
              Esto es para ti si al competir...
            </h3>
            <ul className="space-y-4 text-lg text-text">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Empiezas bien, pero tras un error te vienes abajo
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Aparecen dudas que no tienes entrenando
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Te notas más tenso y menos fluido
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Piensas demasiado en lugar de competir
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Sientes que podrías rendir más, pero algo falla
              </li>
            </ul>
            <p className="mt-8 text-lg text-text font-medium">
              No es falta de nivel. <br />
              <strong>Es cómo gestionas lo que pasa en tu cabeza cuando compites.</strong>
            </p>
          </div>
        </SectionContainer>

        {/* Que conseguiras */}
        <SectionContainer className="bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                ¿Qué conseguirás?
              </h2>
            </div>
            <div className="space-y-4">
              <p className="flex items-start gap-3 text-lg text-text">
                <svg
                  className="w-6 h-6 text-secondary shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <title>Checkmark</title>
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Competirás al nivel al que entrenas
              </p>
              <p className="flex items-start gap-3 text-lg text-text">
                <svg
                  className="w-6 h-6 text-secondary shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <title>Checkmark</title>
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Sabrás qué hacer después de un error
              </p>
              <p className="flex items-start gap-3 text-lg text-text">
                <svg
                  className="w-6 h-6 text-secondary shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <title>Checkmark</title>
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Tendrás más control en momentos clave
              </p>
              <p className="flex items-start gap-3 text-lg text-text">
                <svg
                  className="w-6 h-6 text-secondary shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <title>Checkmark</title>
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Tu confianza dejará de depender del resultado
              </p>
              <p className="flex items-start gap-3 text-lg text-text">
                <svg
                  className="w-6 h-6 text-secondary shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <title>Checkmark</title>
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Competirás bien incluso sin sensaciones perfectas
              </p>
            </div>
            <div className="mt-10 text-center">
              <p className="text-lg font-bold text-text-dark mb-4">
                Si esto es lo que estás buscando:
              </p>
              <Link href="/contact">
                <button
                  type="button"
                  className="bg-primary-dark text-white font-semibold px-8 py-3 rounded-full hover:bg-secondary hover:text-primary-dark hover:shadow-glow transition-all duration-300"
                >
                  Quiero mejorar mi rendimiento en competición
                </button>
              </Link>
            </div>
          </div>
        </SectionContainer>

        {/* Como trabajaremos */}
        <SectionContainer className="bg-background-alt/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                ¿Cómo trabajaremos?
              </h2>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary text-primary-dark font-bold text-lg flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-dark">Entendemos tu caso</h3>
                  <p className="text-text mt-1">
                    Analizamos qué te está pasando realmente en competición
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary text-primary-dark font-bold text-lg flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-dark">Detectamos el bloqueo</h3>
                  <p className="text-text mt-1">Identificamos qué está fallando exactamente</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary text-primary-dark font-bold text-lg flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-dark">Plan práctico</h3>
                  <p className="text-text mt-1">Herramientas concretas para aplicar compitiendo</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary text-primary-dark font-bold text-lg flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-dark">Seguimiento</h3>
                  <p className="text-text mt-1">Ajustamos y llevamos el trabajo a competición</p>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Esto no es motivacion ni teoria */}
        <SectionContainer className="bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                ¿Esto es lo mismo que ya has probado?
              </h2>
            </div>
            <h3 className="text-2xl font-bold text-text-dark mb-6">
              Esto no es motivación ni teoría
            </h3>
            <p className="text-lg text-text mb-4">
              No vamos a trabajar en "pensar en positivo" ni en intentar controlar todo lo que pasa
              por tu cabeza. Porque eso es lo que hace que muchos deportistas se bloqueen más.
            </p>
            <p className="text-lg text-text mb-6">Aquí vas a trabajar algo diferente:</p>
            <ul className="space-y-3 text-lg text-text">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Qué hacer justo después de un error
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Cómo actuar cuando aparecen dudas
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Cómo competir cuando hay presión
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Cómo rendir sin depender de sentirte perfecto
              </li>
            </ul>
            <p className="mt-8 text-lg text-text font-medium">
              No necesitas eliminar los nervios.{" "}
              <strong>Necesitas saber competir con ellos.</strong>
            </p>
          </div>
        </SectionContainer>

        {/* Quien soy */}
        <SectionContainer className="bg-background-alt/50">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="lg:w-1/2 w-full">
              <div className="relative h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/wp/profile-photo.webp"
                  alt="Pere Barceló - Psicólogo Deportivo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
                Sobre mí
              </span>
              <h2 className="text-4xl font-bold text-text-dark tracking-tight">¿Quién soy?</h2>
              <p className="text-text text-lg leading-relaxed">
                Soy Pere Barceló, psicólogo deportivo.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Trabajo con deportistas que entrenan bien pero no consiguen rendir igual en
                competición.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Mi enfoque es práctico: desde la primera sesión sabes exactamente qué hacer cuando
                compites.
              </p>
              <p className="text-lg font-bold text-text-dark mt-6">
                No necesitas más entrenamiento. Necesitas entrenar tu mente.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-primary-dark text-white font-semibold px-8 py-3 rounded-full hover:bg-secondary hover:text-primary-dark hover:shadow-glow transition-all duration-300"
                >
                  Reserva tu sesión gratuita
                </Link>
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>
    </MainLayout>
  );
}
