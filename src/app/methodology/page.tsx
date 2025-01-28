// app/mi-modo-de-trabajo/page.tsx
import Image from "next/image";
import Link from "next/link";

import MainLayout from "@/components/core/MainLayout";
import SectionContainer from "@/components/containers/SectionContainer";
import BaseCard from "@/components/containers/BaseCard";

import { baseUrl, methodologyCards } from "@/utils/data";
import { BaseCardProps } from "@/types/navbar";

export default function WorkMethodPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px py-12">
          {/* Hero Section */}
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
            <Image
              src={`${baseUrl}/stock/sports-psychology.webp`}
              alt="Psicología deportiva"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">Mi modo de trabajo</h1>
              <p className="text-xl">¿Cómo puedo ayudarte en tu deporte?</p>
            </div>
          </div>

                  {/* Approach Section */}
                  <SectionContainer className="">
            <div className="bg-background rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-text-dark mb-6">
                Mi enfoque de trabajo
              </h2>
              <div className="space-y-4 text-text">
                <p className="leading-relaxed">
                  Mi enfoque de trabajo se fundamenta en una serie de principios
                  que buscan integrar la teoría con la práctica, siempre con el
                  objetivo de maximizar el rendimiento y la eficacia en el
                  deporte.
                </p>
                <p className="leading-relaxed">
                  El primer principio que rige mi metodología es la
                  personalización del entrenamiento. Cada atleta es único y, por
                  lo tanto, requiere un enfoque adaptado a sus características,
                  habilidades y metas.
                </p>
              </div>
                  </div>
                  </SectionContainer>

                  {/* Services Grid */}
                  <SectionContainer className="">
                      <div className="grid md:grid-cols-3 gap-8 mb-16">
                          
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
            <div className="space-y-8">
              {/* Online Sessions Detail */}
              <div className="bg-background rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-text-dark mb-4">
                  Sesiones Online en Detalle
                </h3>
                <div className="space-y-4 text-text">
                  <p className="leading-relaxed">
                    Durante la sesión, se realizan evaluaciones de las
                    necesidades individuales, lo que permite ajustar el enfoque
                    y las técnicas que se utilizarán.
                  </p>
                  <p className="leading-relaxed">
                    Los participantes tienen la flexibilidad de asistir desde
                    cualquier lugar, lo que facilita la integración de estas
                    sesiones en sus rutinas habituales.
                  </p>
                  <div className="mt-6 text-center">
                    <Link
                      href="/contact"
                      className="inline-block bg-primary-dark text-white px-6 py-3 rounded-md hover:bg-primary transition-colors"
                    >
                      Solicita tu sesión gratuita de 30 minutos
                    </Link>
                  </div>
                </div>
              </div>

              {/* Club Services Detail */}
              <div className="bg-background rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-text-dark mb-4">
                  Servicios para Clubes
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Los talleres diseñados para los clubes están orientados a
                    fortalecer las habilidades tanto de los deportistas como de
                    los entrenadores y padres.
                  </p>
                  <p className="leading-relaxed">
                    La observación de entrenamientos permite una mirada objetiva
                    sobre la dinámica del equipo, identificando patrones de
                    comportamiento y áreas de mejora.
                  </p>
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>
      </div>
    </MainLayout>
  );
}
