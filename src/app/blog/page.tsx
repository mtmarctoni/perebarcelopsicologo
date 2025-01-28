"use client";
import MainLayout from "@/components/core/MainLayout";
import SectionContainer from "@/components/containers/SectionContainer";
import BlogList from "@/components/core/Blog/BlogList";

export default function BlogListPage() {
  return (
    <MainLayout>
      <SectionContainer className="">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            Blog de Psicología Deportiva
          </h1>
          <p className="text-xl font-semibold text-text-light max-w-2xl mx-auto">
            Descubre consejos, estrategias y reflexiones para mejorar tu
            rendimiento mental en el deporte
          </p>
        </div>
      </SectionContainer>

      <SectionContainer className="">
        <BlogList />
      </SectionContainer>
    </MainLayout>
  );
}
