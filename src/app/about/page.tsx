import Image from "next/image";

import MainLayout from "@/components/MainLayout";
// import { HandshakeIcon, FutbolIcon, GraduationcapIcon } from "@/components/Icons";
// import { FutbolIcon } from "@/components/Icons";

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Hero Section */}
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/stock/personas-escuchando.webp"
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
          <main className="p-6">
            {/* About Section */}
            <section className="mb-16">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2 min-w-[225px]">
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src="/profile/pere2-transparente.webp"
                      alt="Pere Barceló"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover md:drop-shadow-xl drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold text-primary-dark mb-4 text-center">
                    ¿Quién soy?
                  </h2>
                  <p className="text-gray-dark leading-relaxed">
                    ¡Hola! Soy Pere Barceló Lambea, un amante del deporte,
                    especialmente del fútbol. Desde pequeño, mi infancia ha
                    estado marcada por esta pasión, lo que me llevó a estudiar
                    Psicología en la Universitat de les Illes Balears.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Posteriormente, mi deseo de entender la mente humana y
                    ayudar a otros a rendir al máximo nivel me llevó a completar
                    un máster en Psicología de la Actividad Física y del Deporte
                    en la Universidad Autónoma de Madrid.
                  </p>
                </div>
              </div>
            </section>

            {/* Experience Cards */}
            <section className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {/* <FutbolIcon /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                  >
                    <path d="M417.3 360.1l-71.6-4.8c-5.2-.3-10.3 1.1-14.5 4.2s-7.2 7.4-8.4 12.5l-17.6 69.6C289.5 445.8 273 448 256 448s-33.5-2.2-49.2-6.4L189.2 372c-1.3-5-4.3-9.4-8.4-12.5s-9.3-4.5-14.5-4.2l-71.6 4.8c-17.6-27.2-28.5-59.2-30.4-93.6L125 228.3c4.4-2.8 7.6-7 9.2-11.9s1.4-10.2-.5-15l-26.7-66.6C128 109.2 155.3 89 186.7 76.9l55.2 46c4 3.3 9 5.1 14.1 5.1s10.2-1.8 14.1-5.1l55.2-46c31.3 12.1 58.7 32.3 79.6 57.9l-26.7 66.6c-1.9 4.8-2.1 10.1-.5 15s4.9 9.1 9.2 11.9l60.7 38.2c-1.9 34.4-12.8 66.4-30.4 93.6zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm14.1-325.7c-8.4-6.1-19.8-6.1-28.2 0L194 221c-8.4 6.1-11.9 16.9-8.7 26.8l18.3 56.3c3.2 9.9 12.4 16.6 22.8 16.6l59.2 0c10.4 0 19.6-6.7 22.8-16.6l18.3-56.3c3.2-9.9-.3-20.7-8.7-26.8l-47.9-34.8z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Experiencia Deportiva</h3>
                <p className="text-gray-600 text-sm">
                  Amplia experiencia en diversos deportes: fútbol, baloncesto,
                  golf, gimnasia artística y más.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {/* <GraduationcapIcon /> */}
                </div>
                <h3 className="font-semibold mb-2">Formación Académica</h3>
                <p className="text-gray-600 text-sm">
                  Graduado en Psicología y Máster en Psicología de la Actividad
                  Física y del Deporte.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {/* <HandshakeIcon /> */}
                </div>
                <h3 className="font-semibold mb-2">Compromiso</h3>
                <p className="text-gray-600 text-sm">
                  Dedicado a ayudar a deportistas a alcanzar su máximo
                  rendimiento mientras disfrutan del proceso.
                </p>
              </div>
            </section>

            {/* Professional Experience */}
            <section className="bg-white rounded-lg shadow-md p-8 mb-16">
              <h2 className="text-2xl font-bold text-primary-dark mb-6">
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
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Clubes y Federaciones:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>CE Constància</li>
                    <li>CDC Moscardó</li>
                    <li>CF Fuenlabrada</li>
                    <li>CF Playa de Palma</li>
                    <li>CE Petra</li>
                    <li>CE Sineu</li>
                    <li>Joventut Mariana</li>
                    <li>Entreculturas Montesión</li>
                    <li>CB Colonya Pollença</li>
                    <li>CG Alcúdia</li>
                    <li>Palmer Basket Mallorca</li>
                    <li>Federación de Golf de las Islas Baleares</li>
                    <li>Federación de Baloncesto de las Islas Baleares</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Commitment Section */}
            <section className="bg-primary-dark text-white rounded-lg p-8">
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
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
