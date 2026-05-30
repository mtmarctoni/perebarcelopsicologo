import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { createPageMetadata } from "@/app/metadata";
import ClubCard from "@/components/containers/ClubCard";
import SectionContainer from "@/components/containers/SectionContainer";
import MainLayout from "@/components/core/MainLayout";
import { clubs } from "@/utils/data";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre mí | Pere Barceló - Psicólogo Deportivo",
  description:
    "Si sabes que puedes rendir más, esto no va de entrenar más. Conoce a Pere Barceló, psicólogo deportivo especializado en rendimiento bajo presión.",
  path: "/about",
  imagePath: "/wp/profile-photo.webp",
});

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-none sm:rounded-3xl overflow-hidden mx-0 sm:mx-6 lg:mx-8 mt-0 sm:mt-6">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent" />
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6">
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
            Sobre mí
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight max-w-3xl">
            Si sabes que puedes rendir más, esto no va de entrenar más.
          </h1>
          <div className="mt-8">
            <Link href="/contact">
              <button
                type="button"
                className="bg-secondary text-primary-dark font-bold px-8 py-3 rounded-full hover:bg-secondary-light hover:shadow-glow hover:scale-105 transition-all duration-300"
              >
                Pide tu sesión gratuita
              </button>
            </Link>
          </div>
        </div>
      </div>

      <main className="pb-12">
        {/* Club Logos Section */}
        <SectionContainer className="bg-background">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark tracking-tight">
              He trabajado con deportistas de diferentes disciplinas y niveles competitivos.
            </h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 sm:gap-6 items-stretch max-w-4xl mx-auto">
            {clubs.map((club) => (
              <ClubCard key={club.name} club={club} />
            ))}
          </div>
          <div className="mt-10 max-w-2xl mx-auto text-center">
            <p className="text-lg text-text">
              Cada caso es distinto. Pero el patrón suele repetirse:
            </p>
            <p className="text-lg text-text font-medium mt-2">
              Entrenan bien. <br />
              Pero compitiendo no rinden igual.
            </p>
          </div>
        </SectionContainer>

        {/* Por que hago esto */}
        <SectionContainer className="bg-background-alt/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                ¿Por qué hago esto?
              </h2>
            </div>
            <div className="space-y-4 text-lg text-text leading-relaxed">
              <p>He visto a muchos deportistas con nivel quedarse lejos de su rendimiento real.</p>
              <p>No por falta de entrenamiento. No por falta de talento.</p>
              <p>Sino por no saber gestionar lo que pasa en su cabeza cuando compiten.</p>
              <p className="font-medium">
                Ahí es donde se pierde mucho más de lo que parece. Y ahí es donde tiene sentido
                trabajar.
              </p>
            </div>
            <div className="mt-10 text-center">
              <p className="text-lg font-bold text-text-dark mb-4">Si esto encaja contigo:</p>
              <Link href="/contact">
                <button
                  type="button"
                  className="bg-primary-dark text-white font-semibold px-8 py-3 rounded-full hover:bg-secondary hover:text-primary-dark hover:shadow-glow transition-all duration-300"
                >
                  Detecta qué te está limitando
                </button>
              </Link>
            </div>
          </div>
        </SectionContainer>

        {/* Que puedes esperar */}
        <SectionContainer className="bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                ¿Qué puedes esperar al trabajar conmigo?
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
                No trabajamos sobre teoría, sino sobre lo que te pasa compitiendo
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
                Bajamos a tierra cada situación
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
                Sales de cada sesión con acciones concretas
              </p>
            </div>
            <p className="mt-8 text-lg text-text-dark font-bold">
              No se trata de entender más. Se trata de saber qué hacer cuando más importa.
            </p>
          </div>
        </SectionContainer>

        {/* Cual es mi objetivo */}
        <SectionContainer className="bg-background-alt/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight">
                ¿Cuál es mi objetivo?
              </h2>
            </div>
            <p className="text-lg text-text mb-4">No busco que dependas de mí.</p>
            <p className="text-lg text-text mb-6">Busco que:</p>
            <ul className="space-y-3 text-lg text-text">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Aprendas qué hacer cuando fallas
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Sepas cómo competir con dudas
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full shrink-0" />
                Puedas rendir incluso sin confianza perfecta
              </li>
            </ul>
            <p className="mt-8 text-lg text-text-dark font-bold">
              El objetivo es que puedas competir bien por tu cuenta.
            </p>
          </div>
        </SectionContainer>

        {/* Quien soy */}
        <SectionContainer className="bg-background">
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
                Trabajo con deportistas de diferentes disciplinas, adaptando el proceso a cada caso.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Mi objetivo es hacerlo aplicable a tu realidad.
              </p>
              <p className="text-text font-medium text-lg">No complicarlo más.</p>
              <p className="text-text-dark text-lg leading-relaxed mt-4">
                No necesitas cambiar quién eres como deportista.
              </p>
              <p className="text-text-dark text-lg leading-relaxed font-medium">
                Necesitas cambiar cómo gestionas lo que pasa cuando compites.
              </p>
              <p className="text-text-dark text-lg leading-relaxed font-bold mt-2">
                Si sabes que puedes rendir más pero algo te frena, el siguiente paso es claro:
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-primary-dark text-white font-semibold px-8 py-3 rounded-full hover:bg-secondary hover:text-primary-dark hover:shadow-glow transition-all duration-300"
                >
                  Empieza tu proceso ahora
                </Link>
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>
    </MainLayout>
  );
}
