// app/rendimiento/page.tsx
import Image from "next/image";
import Link from "next/link";

import MainLayout from "@/components/core/MainLayout";
import SectionContainer from "@/components/containers/SectionContainer";
import { baseUrl, performanceCards } from "@/utils/data";
import { BaseCardProps } from "@/types/navbar";
import BaseCard from "@/components/containers/BaseCard";

export default function PerformancePage() {
  return (
    <MainLayout>
          {/* Hero Section */}
          <SectionContainer className="">
              
          <header className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
            src={`${baseUrl}/stock/performance-hero.webp`}
              alt="Rendimiento deportivo"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover brightness-75"
              />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">Mejora tu rendimiento</h1>
            </div>
          </header>
              </SectionContainer>

          {/* What is Performance Section */}
          <SectionContainer className="">
              
          <div className="bg-background rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">
              ¿Qué es el rendimiento deportivo?
            </h2>
            <p className="text-text leading-relaxed">
              El rendimiento es la capacidad de obtener los mejores resultados
              con el menor uso de recursos posible. El rendimiento deportivo se
              sustenta en 4 pilares: la técnica, la táctica, la preparación
              física y la preparación psicológica.
            </p>
          </div>
          </SectionContainer>

          {/* Performance Aspects Grid */}
          <SectionContainer className="">
          <h2 className="text-2xl font-bold text-primary-dark mb-8">
              ¿Qué aspectos te harán mejorar tu rendimiento deportivo?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
              {performanceCards.map((card: BaseCardProps) => 
                  <BaseCard
                    key={card.name}
                    image={card.image}
                    Icon={card.Icon}
                    name={card.name}
                    description={card.description}
                  />
                  )}
                  </div>
          </SectionContainer>

          {/* Conclusion Section */}
          <SectionContainer className="">
              
          <div className="bg-background text-text rounded-lg p-8">
            <h2 className="text-2xl text-dark font-bold mb-4">Por lo tanto…</h2>
            <p className="leading-relaxed mb-6">
              La psicología deportiva desempeña un papel crucial en el
              rendimiento deportivo, ya que aborda los aspectos mentales y
              emocionales que influyen directamente en la ejecución y los
              resultados.
            </p>
            <p className="leading-relaxed">
              A través de técnicas como el manejo del estrés, la mejora de la
              concentración, el fortalecimiento de la autoconfianza y la
              regulación emocional, los atletas pueden optimizar su desempeño
              bajo presión y mantener una mentalidad positiva.
            </p>
          </div>
          </SectionContainer>

          {/* CTA Section */}
          <SectionContainer className="">
              
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block bg-primary-dark text-white px-8 py-3 rounded-md hover:bg-secondary transition-colors text-lg font-semibold"
              >
              ¡Pide más información!
            </Link>
          </div>
                </SectionContainer>
    </MainLayout>
  );
}