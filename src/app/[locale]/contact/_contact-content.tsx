import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactSocialSection from "@/components/contact/ContactSocialSection";

export default function ContactContent() {
  return (
    <>
      <ContactHeroSection />
      <main>
        <ContactFormSection />
        <ContactSocialSection />
      </main>
    </>
  );
}
