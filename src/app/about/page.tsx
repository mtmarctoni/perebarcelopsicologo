import Image from "next/image";

import MainLayout from "@/components/core/MainLayout";
import { IconCardContainer } from "@/components/containers/IconContainer";
import ClubCard from '@/components/containers/ClubCard';
// import Seo from '@/components/seo/Seo';
import { clubs } from '@/utils/data';

import { HandshakeIcon, FutbolIcon, GraduationcapIcon } from "@/components/composables/Icons";
import SectionContainer from "@/components/containers/SectionContainer";
import { baseUrl } from "@/utils/data";

// const title = 'Sobre mí - Pere Barceló | Psicólogo Deportivo en Mallorca';
// const description = 'Conoce a Pere Barceló Lambea, psicólogo deportivo especializado en ayudar a deportistas y equipos a alcanzar su máximo rendimiento. Más de 10 años de experiencia.';

export default function AboutPage() {
  return (
    <MainLayout>
      {/* <Seo
        title={title}
        description={description}
        url="/sobre-mi"
        breadcrumbs={[
          { name: 'Sobre mí', item: '/sobre-mi' },
        ]}
      /> */}
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto py-6">
          {/* Hero Section */}
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src={`${baseUrl}/stock/personas-escuchando.webp`}
              alt="Pere Barceló Lambea"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">
                Conociendo a Pere Barceló Lambea
              </h1>
            </div>
          </div>
          <main className="">
            {/* About Section */}
            <SectionContainer className="">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2 min-w-[225px]">
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={`${baseUrl}/profile/pere2-transparente.webp`}
                      alt="Pere Barceló"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover md:drop-shadow-xl drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                    ¿Quién soy?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    ¡Hola! Soy Pere Barceló Lambea, un amante del deporte,
                    especialmente del fútbol. Desde pequeño, mi infancia ha
                    estado marcada por esta pasión, lo que me llevó a estudiar
                    Psicología en la Universitat de les Illes Balears.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Posteriormente, mi deseo de entender la mente humana y
                    ayudar a otros a rendir al máximo nivel me llevó a completar
                    un máster en Psicología de la Actividad Física y del Deporte
                    en la Universidad Autónoma de Madrid.
                  </p>
                </div>
              </div>
            </SectionContainer>
              

            {/* Experience Cards */}
            <SectionContainer className="bg-primary">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-lg shadow-md">
                <IconCardContainer className="bg-secondary-light" >
                  <FutbolIcon />
                </IconCardContainer>
                <h3 className="font-semibold mb-2">Experiencia Deportiva</h3>
                <p className="text-gray-600 text-sm">
                  Amplia experiencia en diversos deportes: fútbol, baloncesto,
                  golf, gimnasia artística y más.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-md">
              <IconCardContainer className="bg-secondary-light" >
                <GraduationcapIcon />
                </IconCardContainer>
                <h3 className="font-semibold mb-2">Formación Académica</h3>
                <p className="text-gray-600 text-sm">
                  Graduado en Psicología y Máster en Psicología de la Actividad
                  Física y del Deporte.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-md">
              <IconCardContainer className="bg-secondary-light" >
                <HandshakeIcon />
                </IconCardContainer>
                <h3 className="font-semibold mb-2">Compromiso</h3>
                <p className="text-gray-600 text-sm">
                  Dedicado a ayudar a deportistas a alcanzar su máximo
                  rendimiento mientras disfrutan del proceso.
                </p>
              </div>
              </div>
            </SectionContainer>
              

            {/* Professional Experience */}
            <SectionContainer className="">

            <div className="bg-background rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-6">
                Mi trayectoria profesional
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  He tenido la suerte de trabajar con muchos deportistas en
                  clubes de diferentes deportes a lo largo de mi carrera. He
                  trabajado con clubes y deportistas de futbol, futbol sala,
                  baloncesto, voleibol, golf, gimnasia artística o pádel entre
                  otros.
                </p>
                <p className="leading-relaxed">
                  Trabajando además con deportistas de diferentes edades y
                  niveles. Desde prebenjamines hasta el primer equipo, tanto
                  masculinos como femeninos.
                </p>
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Clubes y Federaciones:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {clubs.map((club, index) => (
                      <ClubCard key={index} club={club} />
                    ))}
                  </div>
                </div>
              </div>
              </div>
              </SectionContainer>

            {/* Commitment Section */}
            <SectionContainer className="">
            <section className="bg-background text-gray-600 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Mi compromiso</h2>
              <p className="leading-relaxed">
                Como profesional en el campo de la psicología deportiva, mi
                objetivo es ayudar a los deportistas a alcanzar su máximo
                rendimiento, disfrutando también del proceso. Mi trayectoria
                refleja ese compromiso y dedicación hacia el desarrollo de
                jóvenes talentos. Estoy aquí para apoyar, guiar y compartir mi
                pasión por el deporte con aquellos que buscan mejorar y crecer.
              </p>
              </section>
            </SectionContainer>
              
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
