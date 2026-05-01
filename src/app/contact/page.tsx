"use client";

import SectionContainer from "@/components/containers/SectionContainer";
import SocialCard from "@/components/containers/SocialCard";
import CalendlyBookingCard from "@/components/core/CalendlyBookingCard";
import ContactForm from "@/components/core/Forms/ContactForm";
import MainLayout from "@/components/core/MainLayout";
import { socialMediaLinks } from "@/utils/data";

export default function ContactPage() {
  return (
    <MainLayout>
      <main className="min-h-screen pb-12">
        {/* Header Section */}
        <SectionContainer className="">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
              Contacto
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-dark mt-3 mb-6 tracking-tight">
              Contacta conmigo
            </h1>
            <p className="text-text text-lg leading-relaxed">
              ¿Quieres mejorar tu rendimiento deportivo o tu salud mental? Rellena el formulario y
              me pondré en contacto contigo lo antes posible.
            </p>
          </div>
        </SectionContainer>

        {/* Contact Form */}
        <SectionContainer className="bg-background-alt/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-8 items-start">
              <div className="bg-background rounded-3xl shadow-card p-8 sm:p-12">
                <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
                  Formulario
                </span>
                <h2 className="text-3xl font-bold text-text-dark mt-3 mb-4 tracking-tight">
                  Cuentame tu caso
                </h2>
                <p className="text-text-light mb-8 leading-relaxed">
                  Si prefieres explicarme primero tu situacion, completa el formulario y te
                  respondere personalmente.
                </p>
                <ContactForm />
              </div>
              <CalendlyBookingCard />
            </div>
          </div>
        </SectionContainer>

        {/* Social Media Cards */}
        <SectionContainer className="">
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
              Redes
            </span>
            <h2 className="text-3xl font-bold text-text-dark mt-3 tracking-tight">
              También puedes encontrarme en
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {socialMediaLinks.map((social) => (
              <SocialCard
                key={social.name}
                name={social.name}
                Icon={social.Icon}
                link={social.link}
                username={social.username}
              />
            ))}
          </div>
        </SectionContainer>
      </main>
    </MainLayout>
  );
}
