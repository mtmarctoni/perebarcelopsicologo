// app/salud-mental/page.tsx
import Image from "next/image";
import Link from "next/link";

import MainLayout from "@/components/core/MainLayout";
import SectionContainer from "@/components/containers/SectionContainer";
import { BaseCardProps } from "@/types/navbar";
import BaseCard from "@/components/containers/BaseCard";
import { baseUrl, mentalCards } from "@/utils/data";

export default function MentalHealthPage() {
  return (
    <MainLayout>
          {/* Hero Section */}
          <SectionContainer className="">
              
          <header className="relative h-[400px] rounded-xl overflow-hidden mb-12">
            <Image
              src={`${baseUrl}/stock/mental-health-hero.webp`}
              alt="Salud Mental"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover brightness-75"
              />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">
                Mejora tu salud mental
              </h1>
            </div>
          </header>
              </SectionContainer>

          {/* What is Mental Health Section */}
          <SectionContainer className="">
              
          <div className="bg-background rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">
              ¿Qué es la salud mental?
            </h2>
            <p className="text-text leading-relaxed">
              La salud mental es un estado de bienestar emocional, psicológico y
              social que permite a las personas manejar el estrés de la vida,
              desarrollar relaciones saludables, tomar decisiones acertadas y
              desempeñarse de manera efectiva en su entorno.
            </p>
            <p className="text-text leading-relaxed mt-4">
              Una buena salud mental no significa la ausencia de problemas o
              emociones desagradables, sino la habilidad de afrontarlos y
              encontrar un equilibrio que favorezca el bienestar general y la
              calidad de vida.
            </p>
          </div>
          </SectionContainer>

                  {/* Mental Health Aspects Grid */}
                  <SectionContainer className="">
                  <h2 className="text-2xl font-bold text-text-dark mb-8">
              ¿Qué aspectos te harán mejorar tu salud mental?
            </h2>
              <div className="grid md:grid-cols-2 gap-8">
              {mentalCards.map((card: BaseCardProps) => 
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
            <p className="leading-relaxed mb-4">
              La psicología del deporte puede contribuir significativamente a la
              salud mental al proporcionar herramientas para manejar el estrés,
              la presión y los desafíos tanto dentro como fuera del ámbito
              deportivo.
            </p>
            <p className="leading-relaxed">
              A través de técnicas como la regulación emocional, el desarrollo
              de la resiliencia y la construcción de una mentalidad positiva,
              los deportistas pueden aprender a afrontar mejor las adversidades
              y prevenir problemas como la ansiedad o el agotamiento emocional.
            </p>
          </div>
          </SectionContainer>

          {/* CTA Section */}
          <SectionContainer className="">
              
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block bg-primary-dark text-white px-8 py-3 rounded-md hover:bg-secondary-dark transition-colors text-lg font-semibold"
              >
              ¡Pide más información!
            </Link>
          </div>
                </SectionContainer>
    </MainLayout>
  );
}