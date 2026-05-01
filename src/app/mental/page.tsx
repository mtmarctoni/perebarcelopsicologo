import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { createPageMetadata } from "@/app/metadata";
import BaseCard from "@/components/containers/BaseCard";
import SectionContainer from "@/components/containers/SectionContainer";
import MainLayout from "@/components/core/MainLayout";
import type { BaseCardProps } from "@/types/navbar";
import { baseUrl, mentalCards } from "@/utils/data";

export const metadata: Metadata = createPageMetadata({
  title: "Salud mental en el deporte | Pere Barceló",
  description:
    "Mejora tu bienestar emocional con psicologia deportiva aplicada a ansiedad, estres, agotamiento y regulacion emocional.",
  path: "/mental",
  imagePath: "/stock/mental-health-hero.webp",
});

export default function MentalHealthPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <header className="relative h-[500px] rounded-none sm:rounded-3xl overflow-hidden mx-0 sm:mx-6 lg:mx-8 mt-0 sm:mt-6">
        <Image
          src={`${baseUrl}/stock/mental-health-hero.webp`}
          alt="Salud Mental"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 sm:p-12 text-white">
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
            Servicio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-2 tracking-tight">
            Mejora tu salud mental
          </h1>
        </div>
      </header>

      <main className="pb-12">
        {/* What is Mental Health Section */}
        <SectionContainer className="">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
              Concepto
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mt-3 mb-8 tracking-tight">
              ¿Qué es la salud mental?
            </h2>
            <div className="space-y-4 text-text text-lg leading-relaxed">
              <p>
                La salud mental es un estado de bienestar emocional, psicológico y social que
                permite a las personas manejar el estrés de la vida, desarrollar relaciones
                saludables, tomar decisiones acertadas y desempeñarse de manera efectiva en su
                entorno.
              </p>
              <p>
                Una buena salud mental no significa la ausencia de problemas o emociones
                desagradables, sino la habilidad de afrontarlos y encontrar un equilibrio que
                favorezca el bienestar general y la calidad de vida.
              </p>
            </div>
          </div>
        </SectionContainer>

        {/* Mental Health Aspects Grid */}
        <SectionContainer className="bg-background-alt/50">
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
              Aspectos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mt-3 tracking-tight">
              ¿Qué aspectos te harán mejorar?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {mentalCards.map((card: BaseCardProps) => (
              <BaseCard
                key={card.name}
                image={card.image}
                Icon={card.Icon}
                name={card.name}
                description={card.description}
                link={card.link}
              />
            ))}
          </div>
        </SectionContainer>

        {/* Conclusion Section */}
        <SectionContainer className="">
          <div className="max-w-4xl mx-auto">
            <div className="bg-background rounded-3xl shadow-card p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-text-dark mb-6 tracking-tight">
                Por lo tanto…
              </h2>
              <div className="space-y-4 text-text text-lg leading-relaxed">
                <p>
                  La psicología del deporte puede contribuir significativamente a la salud mental al
                  proporcionar herramientas para manejar el estrés, la presión y los desafíos tanto
                  dentro como fuera del ámbito deportivo.
                </p>
                <p>
                  A través de técnicas como la regulación emocional, el desarrollo de la resiliencia
                  y la construcción de una mentalidad positiva, los deportistas pueden aprender a
                  afrontar mejor las adversidades y prevenir problemas como la ansiedad o el
                  agotamiento emocional.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* CTA Section */}
        <SectionContainer className="bg-background-alt/50">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text-dark mb-6 tracking-tight">
              ¿Listo para sentirte mejor?
            </h2>
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
