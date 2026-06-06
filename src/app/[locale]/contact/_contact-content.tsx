"use client";

import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactSocialSection from "@/components/contact/ContactSocialSection";
import MainLayout from "@/components/core/MainLayout";

export default function ContactContent() {
  return (
    <MainLayout>
      <ContactHeroSection />
      <main>
        <ContactFormSection />
        <ContactSocialSection />
      </main>
    </MainLayout>
  );
}
