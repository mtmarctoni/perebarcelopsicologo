import Image from "next/image";
import Link from "next/link";

import MainLayout from "@/components/core/MainLayout";
import {ScrollIcon} from "@/components/composables/Icons";
import SectionContainer from "@/components/containers/SectionContainer";
import { baseUrl } from "@/utils/data";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${baseUrl}/stock/alcanza-tu-objetivo.webp`}
            alt="Pista de atletismo"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
              ¡Alcanza tu{" "}
              <span className="text-secondary">máximo potencial</span>!
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto font-light">
              Psicología deportiva para acercarte a tus objetivos
            </p>
            <div className="pt-4">
              <Link href="/contact">
                <button className="bg-secondary text-primary-dark text-lg font-bold px-10 py-4 rounded-full hover:bg-secondary-light hover:shadow-glow hover:scale-105 transition-all duration-300">
                  ¡Empieza ya!
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ScrollIcon className="w-10 h-10 text-white/70" />
        </div>
      </section>

      <main>
        {/* About Preview Section */}
        <SectionContainer className="bg-background">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Sobre mí</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-text-dark mt-3 tracking-tight">¿Quién soy?</h2>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="relative w-full lg:w-1/2 h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={`${baseUrl}/profile/pere1-transparente.webp`}
                alt="Pere Barceló Psicólogo Deportivo"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <p className="text-text text-lg leading-relaxed">
                ¡Hola! Soy Pere Barceló, psicólogo deportivo con experiencia en mejorar el rendimiento y la salud mental de deportistas a través de sesiones online, talleres grupales y asesoramiento especializado.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Juntos podemos trabajar para que mejores en los diferentes aspectos que afectan al rendimiento deportivo mientras disfrutas del proceso.
              </p>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center bg-primary-dark text-white font-semibold px-8 py-3 rounded-full hover:bg-secondary hover:text-primary-dark hover:shadow-glow transition-all duration-300"
                >
                  ¿Quién soy?
                </Link>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Services Overview Section */}
        <SectionContainer className="bg-background-alt/50">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Servicios</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-text-dark mt-3 tracking-tight">
              ¿En qué te puedo ayudar?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {/* Rendimiento deportivo */}
            <Link href="/performance" className="group block">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ease-smooth hover:-translate-y-2">
                <Image
                  src={`${baseUrl}/stock/golf-coaching.webp`}
                  alt="Entrenamiento de golf"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Rendimiento deportivo</h3>
                  <span className="inline-flex items-center text-secondary font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                    Mejora tu rendimiento deportivo →
                  </span>
                </div>
              </div>
            </Link>

            {/* Salud mental */}
            <Link href="/mental" className="group block">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ease-smooth hover:-translate-y-2">
                <Image
                  src={`${baseUrl}/stock/mental-health.webp`}
                  alt="Salud mental"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Salud mental</h3>
                  <span className="inline-flex items-center text-secondary font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                    Mejora tu salud mental →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </SectionContainer>

        {/* How I Help Section */}
        <SectionContainer className="bg-background">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Modalidades</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-text-dark mt-3 tracking-tight">
              ¿Cómo te puedo ayudar?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sesiones individuales */}
            <div className="group flex flex-col items-center text-center">
              <div className="relative w-full aspect-square mb-6 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ease-smooth hover:-translate-y-2">
                <Image
                  src={`${baseUrl}/stock/sesiones-individuales.webp`}
                  alt="Sesiones individuales online"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Sesiones individuales</h3>
              <p className="mb-6 text-text leading-relaxed">
                Mejora tu rendimiento deportivo y salud mental con sesiones online personalizadas.
              </p>
              <Link
                href="/methodology"
                className="mt-auto inline-flex items-center justify-center bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-full hover:bg-secondary hover:text-primary-dark hover:shadow-glow transition-all duration-300 text-sm"
              >
                Sesiones individuales
              </Link>
            </div>

            {/* Talleres grupales */}
            <div className="group flex flex-col items-center text-center">
              <div className="relative w-full aspect-square mb-6 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ease-smooth hover:-translate-y-2">
                <Image
                  src={`${baseUrl}/stock/talleres-grupales.webp`}
                  alt="Talleres grupales"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Talleres grupales</h3>
              <p className="mb-6 text-text leading-relaxed">
                Mejora el rendimiento deportivo y la salud mental de los entrenadores o atletas de tu club con talleres grupales.
              </p>
              <Link
                href="/methodology"
                className="mt-auto inline-flex items-center justify-center bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-full hover:bg-secondary hover:text-primary-dark hover:shadow-glow transition-all duration-300 text-sm"
              >
                Talleres grupales
              </Link>
            </div>

            {/* Asesoramientos */}
            <div className="group flex flex-col items-center text-center">
              <div className="relative w-full aspect-square mb-6 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ease-smooth hover:-translate-y-2">
                <Image
                  src={`${baseUrl}/stock/asesoramientos-futbol.webp`}
                  alt="Asesoramiento deportivo"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Asesoramientos</h3>
              <p className="mb-6 text-text leading-relaxed">
                Mejora el rendimiento deportivo y la salud mental de los entrenadores o atletas de tu club con un asesoramiento personalizado.
              </p>
              <Link
                href="/methodology"
                className="mt-auto inline-flex items-center justify-center bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-full hover:bg-secondary hover:text-primary-dark hover:shadow-glow transition-all duration-300 text-sm"
              >
                Asesoramiento
              </Link>
            </div>
          </div>
        </SectionContainer>
      </main>
    </MainLayout>
  );
}
