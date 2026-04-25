"use client";

import MainLayout from "@/components/core/MainLayout";
import SocialCard from "@/components/containers/SocialCard";
import { socialMediaLinks } from "@/utils/data";
import SectionContainer from "@/components/containers/SectionContainer";
import ContactForm from "@/components/core/Forms/ContactForm";

export default function ContactPage() {
  return (
    <MainLayout>
      <main className="min-h-screen pb-12">
        {/* Header Section */}
        <SectionContainer className="">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Contacto</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-dark mt-3 mb-6 tracking-tight">
              Contacta conmigo
            </h1>
            <p className="text-text text-lg leading-relaxed">
              ¿Quieres mejorar tu rendimiento deportivo o tu salud mental?
              Rellena el formulario y me pondré en contacto contigo lo antes
              posible.
            </p>
          </div>
        </SectionContainer>

        {/* Contact Form */}
        <SectionContainer className="bg-background-alt/50">
          <div className="max-w-3xl mx-auto">
            <div className="bg-background rounded-3xl shadow-card p-8 sm:p-12">
              <ContactForm />
            </div>
          </div>
        </SectionContainer>

        {/* Social Media Cards */}
        <SectionContainer className="">
          <div className="text-center mb-12">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Redes</span>
            <h2 className="text-3xl font-bold text-text-dark mt-3 tracking-tight">También puedes encontrarme en</h2>
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
