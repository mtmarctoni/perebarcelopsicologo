"use client";

import MainLayout from "@/components/core/MainLayout";
import AboutSection from "@/components/home/AboutSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import DifferentiationSection from "@/components/home/DifferentiationSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import HeroSection from "@/components/home/HeroSection";
import PainPointsSection from "@/components/home/PainPointsSection";
import ProcessSection from "@/components/home/ProcessSection";

export default function HomeContent() {
  return (
    <MainLayout>
      <HeroSection />
      <main>
        <PainPointsSection />
        <BenefitsSection />
        <ProcessSection />
        <DifferentiationSection />
        <AboutSection />
        <FinalCtaSection />
      </main>
    </MainLayout>
  );
}
