import type { Metadata } from "next";
import Link from "next/link";

import { createPageMetadata } from "@/app/metadata";
import SectionContainer from "@/components/containers/SectionContainer";
import MainLayout from "@/components/core/MainLayout";

export const metadata: Metadata = createPageMetadata({
  title: "Servicios | Pere Barceló - Psicólogo Deportivo",
  description:
    "No es que no tengas nivel. Es que no compites igual que entrenas. Psicología deportiva para deportistas que se bloquean en competición.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-none sm:rounded-3xl overflow-hidden mx-0 sm:mx-6 lg:mx-8 mt-0 sm:mt-6">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent" />
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6">
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
            Servicios
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight max-w-3xl">
            No es que no tengas nivel. Es que no compites igual que entrenas.
          </h1>
          <p className="mt-6 text-xl text-white/80 max-w-2xl">
            Psicología deportiva para deportistas que se bloquean en competición y quieren rendir
            cuando más importa.
          </p>
        </div>
      </section>

      <main className="pb-12">
        {/* CTA Initial */}
        <SectionContainer className="bg-background">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-text-dark font-bold">
              Empieza con una sesión gratuita y detecta qué está limitando tu rendimiento.
            </p>
            <div className="mt-6">
              <Link href="/contact">
                <button
                  type="button"
                  className="bg-secondary text-primary-dark font-bold px-10 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow hover:scale-105 transition-all duration-300 text-lg"
                >
                  Reserva tu primera sesión gratuita
                </button>
              </Link>
            </div>
            <p className="mt-4 text-text-light text-sm font-medium">
              Sin compromiso. Primera sesión de análisis
            </p>
          </div>
        </SectionContainer>

        {/* Te pasa esto cuando compites */}
        <SectionContainer className="bg-background-alt/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                ¿Te pasa esto cuando compites?
              </h2>
            </div>
            <ul className="space-y-4 text-lg text-text">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Empiezas bien, pero un error cambia tu rendimiento
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Aparecen dudas que no tienes entrenando
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Te tensas y pierdes fluidez
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Piensas demasiado en vez de competir
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Tu confianza depende del resultado o del momento
              </li>
            </ul>
            <p className="mt-8 text-lg text-text font-bold">
              No es falta de nivel. <br />
              Es gestión del rendimiento bajo presión.
            </p>
          </div>
        </SectionContainer>

        {/* El problema no es lo que te ocurre */}
        <SectionContainer className="bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                El problema no es lo que te ocurre, sino como lo gestionas
              </h2>
            </div>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg text-text">
                No necesitas eliminar los nervios ni controlar todos tus pensamientos.
              </p>
              <p className="text-lg text-text font-medium mt-2">
                Necesitas aprender a competir con ellos.
              </p>
            </div>
            <div className="mt-10 text-center">
              <p className="text-lg font-bold text-text-dark mb-4">Si esto encaja contigo:</p>
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

        {/* Que trabajaremos */}
        <SectionContainer className="bg-background-alt/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                ¿Qué trabajaremos?
              </h2>
            </div>
            <p className="text-lg text-text font-bold mb-6">Situaciones reales de competición:</p>
            <div className="space-y-6">
              <div className="bg-background rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-bold text-text-dark">Después de un error</h3>
                <p className="text-text mt-1">
                  Cómo cortar la caída de rendimiento y volver al partido/competición
                </p>
              </div>
              <div className="bg-background rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-bold text-text-dark">Cuando aparecen dudas</h3>
                <p className="text-text mt-1">
                  Cómo seguir compitiendo sin necesitar confianza perfecta
                </p>
              </div>
              <div className="bg-background rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-bold text-text-dark">Bajo presión</h3>
                <p className="text-text mt-1">Cómo mantener claridad cuando más importa</p>
              </div>
              <div className="bg-background rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-bold text-text-dark">Sin buenas sensaciones</h3>
                <p className="text-text mt-1">Cómo rendir sin depender de cómo te sientes</p>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Que vas a llevar */}
        <SectionContainer className="bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                ¿Qué vas a llevar?
              </h2>
            </div>
            <h3 className="text-xl font-bold text-text-dark mb-6">
              No es teoría, es aplicación directa:
            </h3>
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
                Qué hacer justo después de un error
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
                Cómo gestionar pensamientos en competición
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
                Cómo competir con presión sin bloquearte
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
                Cómo construir una confianza más estable
              </p>
            </div>
          </div>
        </SectionContainer>

        {/* Como es una sesion */}
        <SectionContainer className="bg-background-alt/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                ¿Cómo es una sesión?
              </h2>
            </div>
            <p className="text-lg text-text mb-6">En cada sesión trabajamos tu caso real.</p>
            <div className="space-y-4">
              <p className="flex items-start gap-3 text-lg text-text">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Analizamos situaciones concretas de competición
              </p>
              <p className="flex items-start gap-3 text-lg text-text">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Detectamos qué está limitando tu rendimiento
              </p>
              <p className="flex items-start gap-3 text-lg text-text">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Definimos herramientas aplicables
              </p>
              <p className="flex items-start gap-3 text-lg text-text">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Te llevas acciones claras para usar en competición
              </p>
            </div>
            <p className="mt-6 text-lg text-text font-medium">
              Sales sabiendo qué hacer en cada momento.
            </p>
          </div>
        </SectionContainer>

        {/* Que no es esto */}
        <SectionContainer className="bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                ¿Qué no es esto?
              </h2>
            </div>
            <p className="text-lg text-text font-medium mb-4">Esto NO es:</p>
            <ul className="space-y-3 text-lg text-text mb-8">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-red-400 rounded-full shrink-0" />
                Motivación o frases positivas
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-red-400 rounded-full shrink-0" />
                Teoría sin aplicación
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-red-400 rounded-full shrink-0" />
                Técnicas genéricas
              </li>
            </ul>
            <p className="text-lg text-text font-medium mb-4">
              Esto es entrenamiento mental aplicado a competición real.
            </p>
            <p className="text-lg text-text mb-4">A diferencia de otros enfoques:</p>
            <ul className="space-y-3 text-lg text-text">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                No trabajamos "cómo sentirte mejor"
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Trabajamos cómo rendir mejor incluso sin sentirte bien
              </li>
            </ul>
          </div>
        </SectionContainer>

        {/* Final CTA */}
        <SectionContainer className="bg-background-alt/50">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-text-dark font-bold mb-6">
              Si sabes que puedes rendir más pero algo te frena:
            </p>
            <Link href="/contact">
              <button
                type="button"
                className="bg-secondary text-primary-dark font-bold px-10 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow hover:scale-105 transition-all duration-300 text-lg"
              >
                Empieza ahora tu proceso
              </button>
            </Link>
          </div>
        </SectionContainer>

        {/* FAQ */}
        <SectionContainer className="bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                Preguntas frecuentes
              </h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">¿Y si no me funciona?</h3>
                <p className="text-text text-lg leading-relaxed">
                  La primera sesión es 100% gratuita. Sin ningún tipo de compromiso.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">
                  ¿Esto sirve para mi deporte?
                </h3>
                <p className="text-text text-lg leading-relaxed">
                  El proceso se adapta a cada disciplina.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2">
                  ¿Cuánto tiempo se tarda en notar cambios?
                </h3>
                <p className="text-text text-lg leading-relaxed">
                  Depende del caso, pero desde las primeras sesiones ya trabajas herramientas
                  aplicables.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>
    </MainLayout>
  );
}
