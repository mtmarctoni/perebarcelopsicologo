import AboutBioSection from "@/components/about/AboutBioSection";
import AboutClubsSection from "@/components/about/AboutClubsSection";
import AboutCtaSection from "@/components/about/AboutCtaSection";
import AboutExpectSection from "@/components/about/AboutExpectSection";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutObjectiveSection from "@/components/about/AboutObjectiveSection";
import AboutWhySection from "@/components/about/AboutWhySection";

export default function AboutContent() {
  return (
    <>
      <AboutHeroSection />
      <main>
        <AboutClubsSection />
        <AboutWhySection />
        <AboutExpectSection />
        <AboutObjectiveSection />
        <AboutBioSection />
        <AboutCtaSection />
      </main>
    </>
  );
}
