import Image from "next/image";

import MainLayout from "@/components/MianLayout";
import Link from "next/link";
import ScrollIcon from "@/icons/scroll-indicator.svg";
import SectionContainer from "@/components/SectionContainer";

export default function Home() {
  return (
    <MainLayout >
      <section className="relative h-screen min-h-144 w-full">
        {/* Full-width background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/stock/alcanza-tu-objetivo.webp"
            alt="Pista de atletismo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover brightness-75"
            priority
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
        </div>

        {/* Content container */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white my-4 mt-20 animate-fade-in">
            ¡Alcanza tu máximo potencial!
          </h1>
          
          <p className="text-xl md:text-2xl text-white my-12 max-w-2xl">
            Psicología deportiva para acercarte a tus objetivos
          </p>

          <button 
            className="bg-primary-dark text-white text-lg px-8 py-3 rounded-md 
                      hover:bg-secondary transform hover:scale-105 
                      transition-all duration-300 shadow-lg"
          >
            ¡Empieza ya!
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ScrollIcon className="w-6 h-6 text-white animate-bounce" />
        </div>
      </section>

      <main className="">
      <SectionContainer bgColor="bg-background">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-dark mb-8 text-center">¿Quién soy?</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative md:w-1/2 min-w-[225px] h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/profile/pere1-transparente.webp"
                  alt="Pere Barceló Psicólogo Deportivo"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  
                className="object-cover rounded-lg drop-shadow-2xl"
              />
            </div>
            <div className="md:w-1/2 space-y-6 flex flex-col items-center">
              <p className="text-gray-dark text-lg">
                ¡Hola! Soy Pere Barceló, psicólogo deportivo con experiencia en mejorar el rendimiento y la salud mental de deportistas a través de sesiones online, talleres grupales y asesoramiento especializado.
              </p>
              <p className="text-gray-dark text-lg">
                Juntos podemos trabajar para que mejores en los diferentes aspectos que afectan al rendimiento deportivo mientras disfrutas del proceso.
              </p>
              <Link
                href="/about"
                >
                <button className="font-semibold relative flex h-[50px] w-40 items-center justify-center rounded-md overflow-hidden bg-primary-dark text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-secondary before:duration-100 before:ease-linear hover:bg-secondary hover:text-primary-dark hover:shadow-secondary hover:before:border-[25px]">
                  <span className="relative z-10">
                    ¿Quién soy?
                  </span>
                 </button>
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer bgColor="primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-dark mb-12 text-center">
            ¿En qué te puedo ayudar?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Rendimiento deportivo card */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">Rendimiento deportivo</h3>
              <div className="relative w-full aspect-video mb-4">
                <Image
                  src="/stock/golf-coaching.webp"
                  alt="Entrenamiento de golf"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>
              <Link 
                href="/rendimiento"
                className="bg-primary-dark text-white px-6 py-2 rounded-md hover:bg-secondary transition-colors"
              >
                Mejora tu rendimiento deportivo
              </Link>
            </div>

            {/* Salud mental card */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">Salud mental</h3>
              <div className="relative w-full aspect-video mb-4">
                <Image
                  src="/stock/mental-health.webp"
                  alt="Salud mental"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>
              <Link 
                href="/salud-mental"
                className="bg-primary-dark text-white px-6 py-2 rounded-md hover:bg-secondary transition-colors"
              >
                Mejora tu salud mental
              </Link>
            </div>
          </div>
        </div>
        </SectionContainer> 
        
        {/* How I Help Section - Enhanced */}
        <SectionContainer bgColor="white">
          
          <h2 className="text-3xl font-bold text-gray-dark mb-12 text-center">
            ¿Cómo te puedo ayudar?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sesiones individuales */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-4">Sesiones individuales</h3>
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src="/stock/sesiones-individuales.webp"
                  alt="Sesiones individuales online"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="mb-6 text-gray-dark">
                Mejora tu rendimiento deportivo y salud mental con sesiones online personalizadas.
              </p>
              <Link 
                href="/sesiones-individuales"
                className="bg-primary-dark text-white px-6 py-2 rounded-md hover:bg-secondary transition-colors mt-auto"
              >
                Sesiones individuales
              </Link>
            </div>

            {/* Talleres grupales */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-4">Talleres grupales</h3>
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src="/stock/talleres-grupales.webp"
                  alt="Talleres grupales"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="mb-6 text-gray-dark">
                Mejora el rendimiento deportivo y la salud mental de los entrenadores o atletas de tu club con talleres grupales.
              </p>
              <Link 
                href="/talleres-grupales"
                className="bg-primary-dark text-white px-6 py-2 rounded-md hover:bg-secondary transition-colors mt-auto"
              >
                Talleres grupales
              </Link>
            </div>

            {/* Asesoramientos */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-4">Asesoramientos</h3>
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src="/stock/asesoramientos-futbol.webp"
                  alt="Asesoramiento deportivo"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="mb-6 text-gray-dark">
                Mejora el rendimiento deportivo y la salud mental de los entrenadores o atletas de tu club con un asesoramiento personalizado.
              </p>
              <Link 
                href="/asesoramiento"
                className="bg-primary-dark text-white px-6 py-2 rounded-md hover:bg-secondary transition-colors mt-auto"
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
