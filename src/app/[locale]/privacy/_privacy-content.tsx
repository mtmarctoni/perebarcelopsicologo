import MainLayout from "@/components/core/MainLayout";
import PrivacyContentSection from "@/components/privacy/PrivacyContentSection";
import PrivacyHeroSection from "@/components/privacy/PrivacyHeroSection";

export default function PrivacyContent() {
  return (
    <MainLayout>
      <PrivacyHeroSection />
      <main>
        <PrivacyContentSection />
      </main>
    </MainLayout>
  );
}
