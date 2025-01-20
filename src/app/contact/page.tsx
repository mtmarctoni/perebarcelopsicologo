"use client";
import { Widget } from "@typeform/embed-react";

import MainLayout from "@/components/core/MainLayout";
import SocialCard from "@/components/containers/SocialCard";
import { socialMediaLinks } from "@/utils/data";

export default function ContactPage() {

  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header Section */}
          <header className="text-center mb-12 pt-12">
            <h1 className="text-4xl font-bold text-primary-dark mb-4">
              Contacta conmigo
            </h1>
            <p className="text-gray-dark max-w-2xl mx-auto">
              ¿Quieres mejorar tu rendimiento deportivo o tu salud mental?
              Rellena el formulario y me pondré en contacto contigo lo antes
              posible.
            </p>
          </header>
          <main>
            {/* Typeform Widget */}
            <div className="rounded-lg overflow-hidden">
              <Widget
                id="NfbgnS1x"
                style={{ height: "300px" }}
                className="my-form"
                hideHeaders
                hideFooter
              />
            </div>
            
            {/* Social Media Cards */}
            <div className="grid md:grid-cols-3 gap-6 my-6">
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
            
          </main>
        </div>
      </div>
    </MainLayout>
  );
};