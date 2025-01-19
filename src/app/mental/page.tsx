// app/salud-mental/page.tsx
import Image from "next/image";
import Link from "next/link";

import HeartIcon from "@/icons/heart.svg";
import BalanceIcon from "@/icons/balance.svg";
import BatteryIcon from "@/icons/battery.svg";
import StarIcon from "@/icons/star.svg";
import MainLayout from "@/components/MianLayout";

export default function MentalHealthPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
            <Image
              src="/stock/mental-health-hero.webp"
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
          </div>

          {/* What is Mental Health Section */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              ¿Qué es la salud mental?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              La salud mental es un estado de bienestar emocional, psicológico y
              social que permite a las personas manejar el estrés de la vida,
              desarrollar relaciones saludables, tomar decisiones acertadas y
              desempeñarse de manera efectiva en su entorno.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Una buena salud mental no significa la ausencia de problemas o
              emociones desagradables, sino la habilidad de afrontarlos y
              encontrar un equilibrio que favorezca el bienestar general y la
              calidad de vida.
            </p>
          </section>

          {/* Mental Health Aspects Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary-dark mb-8">
              ¿Qué aspectos te harán mejorar tu salud mental?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Emotional Management */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/stock/emotional-health.webp"
                    alt="Gestión emocional"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mb-4">
                    <HeartIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3">
                    Gestión emocional
                  </h3>
                  <p className="text-gray-600">
                    La gestión emocional es fundamental para la salud mental, ya
                    que te permite comprender, regular y expresar las emociones
                    de manera adecuada, promoviendo el equilibrio psicológico.
                  </p>
                </div>
              </div>

              {/* Stress Management */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/stock/stress-management.webp"
                    alt="Manejo del estrés"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mb-4">
                    <BalanceIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3">
                    Manejo del estrés
                  </h3>
                  <p className="text-gray-600">
                    El manejo del estrés es crucial para preservar la salud
                    mental, ya que el estrés crónico puede desencadenar
                    problemas como ansiedad, depresión y agotamiento emocional.
                  </p>
                </div>
              </div>

              {/* Burnout Prevention */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/stock/burnout-prevention.webp"
                    alt="Prevención del burnout"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mb-4">
                    <BatteryIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3">
                    Prevención del burnout
                  </h3>
                  <p className="text-gray-600">
                    La prevención del burnout es esencial para proteger tu salud
                    mental, ya que este síndrome afecta la capacidad de una
                    persona para desempeñarse en su vida diaria y laboral.
                  </p>
                </div>
              </div>

              {/* Self-esteem Improvement */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/stock/self-esteem.webp"
                    alt="Mejora de la autoestima"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mb-4">
                    <StarIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3">
                    Mejora de la autoestima
                  </h3>
                  <p className="text-gray-600">
                    La autoestima es un componente esencial para la salud
                    mental, ya que influye directamente en la forma en que te
                    percibes a ti mismo y enfrentas los retos de la vida.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion Section */}
          <section className="bg-primary-dark text-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Por lo tanto…</h2>
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
          </section>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block bg-primary-dark text-white px-8 py-3 rounded-md hover:bg-secondary-dark transition-colors text-lg font-semibold"
            >
              ¡Pide más información!
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
