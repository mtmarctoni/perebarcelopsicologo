"use client";

import AboutBioSection from "@/components/about/AboutBioSection";
import AboutClubsSection from "@/components/about/AboutClubsSection";
import AboutCtaSection from "@/components/about/AboutCtaSection";
import AboutExpectSection from "@/components/about/AboutExpectSection";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutObjectiveSection from "@/components/about/AboutObjectiveSection";
import AboutWhySection from "@/components/about/AboutWhySection";
import MainLayout from "@/components/core/MainLayout";

export default function AboutContent() {
  return (
    <MainLayout>
      <AboutHeroSection />
      <main>
        <AboutClubsSection />
        <AboutWhySection />
        <AboutExpectSection />
        <AboutObjectiveSection />
        <AboutBioSection />
        <AboutCtaSection />
      </main>
    </MainLayout>
  );
}
