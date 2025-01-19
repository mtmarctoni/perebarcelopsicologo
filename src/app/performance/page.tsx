// app/rendimiento/page.tsx
import Image from "next/image";
import Link from "next/link";

import BrainIcon from "@/icons/brain.svg";
import ChartlineIcon from "@/icons/chartline.svg";
import HeartbeatIcons from "@/icons/heartbeat.svg";
import LightbulbIcon from "@/icons/lightbulb.svg";
import MainLayout from "@/components/MainLayout";

export default function PerformancePage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
            <Image
              src="/stock/performance-hero.webp"
              alt="Rendimiento deportivo"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">Mejora tu rendimiento</h1>
            </div>
          </div>

          {/* What is Performance Section */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              ¿Qué es el rendimiento deportivo?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              El rendimiento es la capacidad de obtener los mejores resultados
              con el menor uso de recursos posible. El rendimiento deportivo se
              sustenta en 4 pilares: la técnica, la táctica, la preparación
              física y la preparación psicológica.
            </p>
          </section>

          {/* Performance Aspects Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary-dark mb-8">
              ¿Qué aspectos te harán mejorar tu rendimiento deportivo?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Emotional Management */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/stock/emotional-management.webp"
                    alt="Gestión emocional"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mb-4">
                    <HeartbeatIcons className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3">
                    Gestión emocional
                  </h3>
                  <p className="text-gray-600">
                    A la hora de competir siempre vas a tener que lidiar con
                    muchas emociones. La gestión que hagas de las diferentes
                    emociones que aparezcan marcarán en gran parte tus
                    resultados.
                  </p>
                </div>
              </div>

              {/* Concentration */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/stock/concentration.webp"
                    alt="Concentración"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mb-4">
                    <BrainIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3">
                    Concentración
                  </h3>
                  <p className="text-gray-600">
                    La concentración es esencial para el rendimiento deportivo,
                    ya que te permitirá enfocarte en el presente, bloquear
                    distracciones y ejecutar habilidades con precisión.
                  </p>
                </div>
              </div>

              {/* Self-confidence */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/stock/self-confidence.webp"
                    alt="Autoconfianza"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mb-4">
                    <ChartlineIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3">
                    Autoconfianza
                  </h3>
                  <p className="text-gray-600">
                    La autoconfianza es un pilar fundamental en el rendimiento
                    deportivo, ya que influye directamente en tu capacidad para
                    enfrentar desafíos y mantener la motivación.
                  </p>
                </div>
              </div>

              {/* Motivation */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/stock/motivation.webp"
                    alt="Motivación"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mb-4">
                    <LightbulbIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3">
                    Motivación
                  </h3>
                  <p className="text-gray-600">
                    La motivación es el motor esencial en el rendimiento
                    deportivo, ya que te impulsa a fijarte metas, perseverar en
                    el entrenamiento y superar desafíos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion Section */}
          <section className="bg-primary-dark text-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Por lo tanto…</h2>
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
          </section>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block bg-primary-dark text-white px-8 py-3 rounded-md hover:bg-secondary transition-colors text-lg font-semibold"
            >
              ¡Pide más información!
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
