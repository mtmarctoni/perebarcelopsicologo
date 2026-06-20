import ServiciosCtaSection from "@/components/servicios/ServiciosCtaSection";
import ServiciosFaqSection from "@/components/servicios/ServiciosFaqSection";
import ServiciosHeroSection from "@/components/servicios/ServiciosHeroSection";
import ServiciosNotThisSection from "@/components/servicios/ServiciosNotThisSection";
import ServiciosPainSection from "@/components/servicios/ServiciosPainSection";
import ServiciosProblemSection from "@/components/servicios/ServiciosProblemSection";
import ServiciosSessionSection from "@/components/servicios/ServiciosSessionSection";
import ServiciosTakeawaysSection from "@/components/servicios/ServiciosTakeawaysSection";
import ServiciosWorkSection from "@/components/servicios/ServiciosWorkSection";

export default function ServiciosContent() {
  return (
    <>
      <ServiciosHeroSection />
      <main>
        <ServiciosPainSection />
        <ServiciosProblemSection />
        <ServiciosWorkSection />
        <ServiciosTakeawaysSection />
        <ServiciosSessionSection />
        <ServiciosNotThisSection />
        <ServiciosCtaSection />
        <ServiciosFaqSection />
      </main>
    </>
  );
}
