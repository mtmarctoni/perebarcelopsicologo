import type { Metadata } from "next";
import Image from "next/image";

import { createPageMetadata } from "@/app/metadata";
import { FutbolIcon, GraduationcapIcon, HandshakeIcon } from "@/components/composables/Icons";
import ClubCard from "@/components/containers/ClubCard";
import { IconCardContainer } from "@/components/containers/IconContainer";
import SectionContainer from "@/components/containers/SectionContainer";
import MainLayout from "@/components/core/MainLayout";
import { baseUrl, clubs } from "@/utils/data";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre Pere Barceló Lambea | Psicólogo deportivo",
  description:
    "Conoce la trayectoria, formación y enfoque de Pere Barceló Lambea como psicólogo deportivo especializado en deportistas, equipos y clubes.",
  path: "/about",
  imagePath: "/stock/personas-escuchando.webp",
});

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-none sm:rounded-3xl overflow-hidden mx-0 sm:mx-6 lg:mx-8 mt-0 sm:mt-6">
        <Image
          src={`${baseUrl}/stock/personas-escuchando.webp`}
          alt="Pere Barceló Lambea"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 sm:p-12 text-white">
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
            Sobre mí
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-2 tracking-tight">
            Conociendo a Pere Barceló Lambea
          </h1>
        </div>
      </div>

      <main className="pb-12">
        {/* About Section */}
        <SectionContainer className="">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="lg:w-1/2 w-full">
              <div className="relative h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={`${baseUrl}/profile/pere2-transparente.webp`}
                  alt="Pere Barceló"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
                Mi historia
              </span>
              <h2 className="text-4xl font-bold text-text-dark tracking-tight">¿Quién soy?</h2>
              <p className="text-text text-lg leading-relaxed">
                ¡Hola! Soy Pere Barceló Lambea, un amante del deporte, especialmente del fútbol.
                Desde pequeño, mi infancia ha estado marcada por esta pasión, lo que me llevó a
                estudiar Psicología en la Universitat de les Illes Balears.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Posteriormente, mi deseo de entender la mente humana y ayudar a otros a rendir al
                máximo nivel me llevó a completar un máster en Psicología de la Actividad Física y
                del Deporte en la Universidad Autónoma de Madrid.
              </p>
            </div>
          </div>
        </SectionContainer>

        {/* Experience Cards */}
        <SectionContainer className="bg-background-alt/50">
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
              Fortalezas
            </span>
            <h2 className="text-4xl font-bold text-text-dark mt-3 tracking-tight">
              ¿Por qué elegirme?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 ease-smooth hover:-translate-y-2 text-center group">
              <IconCardContainer className="bg-secondary/10 group-hover:bg-secondary/20 transition-colors duration-500">
                <FutbolIcon className="w-8 h-8 text-secondary" />
              </IconCardContainer>
              <h3 className="text-xl font-bold text-text-dark mb-3">Experiencia Deportiva</h3>
              <p className="text-text leading-relaxed">
                Amplia experiencia en diversos deportes: fútbol, baloncesto, golf, gimnasia
                artística y más.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 ease-smooth hover:-translate-y-2 text-center group">
              <IconCardContainer className="bg-secondary/10 group-hover:bg-secondary/20 transition-colors duration-500">
                <GraduationcapIcon className="w-8 h-8 text-secondary" />
              </IconCardContainer>
              <h3 className="text-xl font-bold text-text-dark mb-3">Formación Académica</h3>
              <p className="text-text leading-relaxed">
                Graduado en Psicología y Máster en Psicología de la Actividad Física y del Deporte.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 ease-smooth hover:-translate-y-2 text-center group">
              <IconCardContainer className="bg-secondary/10 group-hover:bg-secondary/20 transition-colors duration-500">
                <HandshakeIcon className="w-8 h-8 text-secondary" />
              </IconCardContainer>
              <h3 className="text-xl font-bold text-text-dark mb-3">Compromiso</h3>
              <p className="text-text leading-relaxed">
                Dedicado a ayudar a deportistas a alcanzar su máximo rendimiento mientras disfrutan
                del proceso.
              </p>
            </div>
          </div>
        </SectionContainer>

        {/* Professional Experience */}
        <SectionContainer className="">
          <div className="bg-background rounded-3xl shadow-card p-8 sm:p-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
              Trayectoria
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mt-3 mb-8 tracking-tight">
              Mi trayectoria profesional
            </h2>
            <div className="space-y-6 text-text">
              <p className="text-lg leading-relaxed">
                He tenido la suerte de trabajar con muchos deportistas en clubes de diferentes
                deportes a lo largo de mi carrera. He trabajado con clubes y deportistas de futbol,
                futbol sala, baloncesto, voleibol, golf, gimnasia artística o pádel entre otros.
              </p>
              <p className="text-lg leading-relaxed">
                Trabajando además con deportistas de diferentes edades y niveles. Desde
                prebenjamines hasta el primer equipo, tanto masculinos como femeninos.
              </p>
              <div className="mt-12">
                <h3 className="text-xl font-bold text-text-dark mb-6">Clubes y Federaciones</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 items-stretch">
                  {clubs.map((club) => (
                    <ClubCard key={club.name} club={club} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Commitment Section */}
        <SectionContainer className="bg-background-alt/50">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
              Filosofía
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mt-3 mb-8 tracking-tight">
              Mi compromiso
            </h2>
            <p className="text-text text-lg leading-relaxed">
              Como profesional en el campo de la psicología deportiva, mi objetivo es ayudar a los
              deportistas a alcanzar su máximo rendimiento, disfrutando también del proceso. Mi
              trayectoria refleja ese compromiso y dedicación hacia el desarrollo de jóvenes
              talentos. Estoy aquí para apoyar, guiar y compartir mi pasión por el deporte con
              aquellos que buscan mejorar y crecer.
            </p>
          </div>
        </SectionContainer>
      </main>
    </MainLayout>
  );
}
