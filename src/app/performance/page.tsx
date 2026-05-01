import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { createPageMetadata } from "@/app/metadata";
import MainLayout from "@/components/core/MainLayout";
import SectionContainer from "@/components/containers/SectionContainer";
import { baseUrl, performanceCards } from "@/utils/data";
import { BaseCardProps } from "@/types/navbar";
import BaseCard from "@/components/containers/BaseCard";

export const metadata: Metadata = createPageMetadata({
  title: "Mejora tu rendimiento deportivo | Pere Barceló",
  description:
    "Trabaja concentracion, motivacion, autoconfianza y gestion emocional para rendir mejor en competicion y entrenamiento.",
  path: "/performance",
  imagePath: "/stock/performance-hero.webp",
});

export default function PerformancePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <header className="relative h-[500px] rounded-none sm:rounded-3xl overflow-hidden mx-0 sm:mx-6 lg:mx-8 mt-0 sm:mt-6">
        <Image
          src={`${baseUrl}/stock/performance-hero.webp`}
          alt="Rendimiento deportivo"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 sm:p-12 text-white">
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Servicio</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-2 tracking-tight">
            Mejora tu rendimiento
          </h1>
        </div>
      </header>

      <main className="pb-12">
        {/* What is Performance Section */}
        <SectionContainer className="">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Concepto</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mt-3 mb-8 tracking-tight">
              ¿Qué es el rendimiento deportivo?
            </h2>
            <p className="text-text text-lg leading-relaxed">
              El rendimiento es la capacidad de obtener los mejores resultados
              con el menor uso de recursos posible. El rendimiento deportivo se
              sustenta en 4 pilares: la técnica, la táctica, la preparación
              física y la preparación psicológica.
            </p>
          </div>
        </SectionContainer>

        {/* Performance Aspects Grid */}
        <SectionContainer className="bg-background-alt/50">
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Aspectos</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mt-3 tracking-tight">
              ¿Qué aspectos te harán mejorar?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {performanceCards.map((card: BaseCardProps) =>
              <BaseCard
                key={card.name}
                image={card.image}
                Icon={card.Icon}
                name={card.name}
                description={card.description}
                link={card.link}
              />
            )}
          </div>
        </SectionContainer>

        {/* Conclusion Section */}
        <SectionContainer className="">
          <div className="max-w-4xl mx-auto">
            <div className="bg-background rounded-3xl shadow-card p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-text-dark mb-6 tracking-tight">Por lo tanto…</h2>
              <div className="space-y-4 text-text text-lg leading-relaxed">
                <p>
                  La psicología deportiva desempeña un papel crucial en el
                  rendimiento deportivo, ya que aborda los aspectos mentales y
                  emocionales que influyen directamente en la ejecución y los
                  resultados.
                </p>
                <p>
                  A través de técnicas como el manejo del estrés, la mejora de la
                  concentración, el fortalecimiento de la autoconfianza y la
                  regulación emocional, los atletas pueden optimizar su desempeño
                  bajo presión y mantener una mentalidad positiva.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* CTA Section */}
        <SectionContainer className="bg-background-alt/50">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text-dark mb-6 tracking-tight">¿Listo para mejorar?</h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-primary-dark text-white px-10 py-4 rounded-full hover:bg-secondary hover:text-primary-dark hover:shadow-glow transition-all duration-300 text-lg font-bold"
            >
              ¡Pide más información!
            </Link>
          </div>
        </SectionContainer>
      </main>
    </MainLayout>
  );
}
