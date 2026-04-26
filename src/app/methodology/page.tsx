import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { createPageMetadata } from "@/app/metadata";
import MainLayout from "@/components/core/MainLayout";
import SectionContainer from "@/components/containers/SectionContainer";
import BaseCard from "@/components/containers/BaseCard";

import { baseUrl, methodologyCards } from "@/utils/data";
import { BaseCardProps } from "@/types/navbar";

export const metadata: Metadata = createPageMetadata({
  title: "Metodologia y modo de trabajo | Pere Barceló",
  description:
    "Descubre como trabaja Pere Barceló con sesiones online, talleres grupales y asesoramiento a clubes desde la psicologia deportiva.",
  path: "/methodology",
  imagePath: "/stock/sports-psychology.webp",
});

export default function WorkMethodPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-none sm:rounded-3xl overflow-hidden mx-0 sm:mx-6 lg:mx-8 mt-0 sm:mt-6">
        <Image
          src={`${baseUrl}/stock/sports-psychology.webp`}
          alt="Psicología deportiva"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 sm:p-12 text-white">
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Metodología</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-2 tracking-tight">
            Mi modo de trabajo
          </h1>
          <p className="text-xl text-white/80 mt-2">¿Cómo puedo ayudarte en tu deporte?</p>
        </div>
      </div>

      <main className="pb-12">
        {/* Approach Section */}
        <SectionContainer className="">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Filosofía</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mt-3 mb-8 tracking-tight">
              Mi enfoque de trabajo
            </h2>
            <div className="space-y-4 text-text text-lg leading-relaxed">
              <p>
                Mi enfoque de trabajo se fundamenta en una serie de principios
                que buscan integrar la teoría con la práctica, siempre con el
                objetivo de maximizar el rendimiento y la eficacia en el
                deporte.
              </p>
              <p>
                El primer principio que rige mi metodología es la
                personalización del entrenamiento. Cada atleta es único y, por
                lo tanto, requiere un enfoque adaptado a sus características,
                habilidades y metas.
              </p>
            </div>
          </div>
        </SectionContainer>

        {/* Services Grid */}
        <SectionContainer className="bg-background-alt/50">
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Servicios</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mt-3 tracking-tight">¿Cómo trabajo?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {methodologyCards.map((card: BaseCardProps) =>
              <BaseCard key={card.name}
                image={card.image}
                Icon={card.Icon}
                name={card.name}
                description={card.description}
                link={card.link}
              />
            )}
          </div>
        </SectionContainer>

        {/* Detailed Services */}
        <SectionContainer className="">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Online Sessions Detail */}
            <div className="bg-background rounded-3xl shadow-card p-8 sm:p-12">
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Detalle</span>
              <h3 className="text-2xl font-bold text-text-dark mt-3 mb-6 tracking-tight">
                Sesiones Online en Detalle
              </h3>
              <div className="space-y-4 text-text text-lg leading-relaxed">
                <p>
                  Durante la sesión, se realizan evaluaciones de las
                  necesidades individuales, lo que permite ajustar el enfoque
                  y las técnicas que se utilizarán.
                </p>
                <p>
                  Los participantes tienen la flexibilidad de asistir desde
                  cualquier lugar, lo que facilita la integración de estas
                  sesiones en sus rutinas habituales.
                </p>
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-primary-dark text-white px-8 py-3 rounded-full hover:bg-secondary hover:text-primary-dark hover:shadow-glow transition-all duration-300 font-semibold"
                >
                  Solicita tu sesión gratuita de 30 minutos
                </Link>
              </div>
            </div>

            {/* Club Services Detail */}
            <div className="bg-background rounded-3xl shadow-card p-8 sm:p-12">
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Clubes</span>
              <h3 className="text-2xl font-bold text-text-dark mt-3 mb-6 tracking-tight">
                Servicios para Clubes
              </h3>
              <div className="space-y-4 text-text text-lg leading-relaxed">
                <p>
                  Los talleres diseñados para los clubes están orientados a
                  fortalecer las habilidades tanto de los deportistas como de
                  los entrenadores y padres.
                </p>
                <p>
                  La observación de entrenamientos permite una mirada objetiva
                  sobre la dinámica del equipo, identificando patrones de
                  comportamiento y áreas de mejora.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>
    </MainLayout>
  );
}
