"use client";
import MainLayout from "@/components/core/MainLayout";
import SectionContainer from "@/components/containers/SectionContainer";
import BlogList from "@/components/core/Blog/BlogList";

export default function BlogListPage() {
  return (
    <MainLayout>
      <main className="pb-12">
        <SectionContainer className="">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Blog</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-dark mt-3 mb-6 tracking-tight">
              Blog de Psicología Deportiva
            </h1>
            <p className="text-text text-lg leading-relaxed">
              Descubre consejos, estrategias y reflexiones para mejorar tu
              rendimiento mental en el deporte
            </p>
          </div>
        </SectionContainer>

        <SectionContainer className="bg-background-alt/50">
          <BlogList />
        </SectionContainer>
      </main>
    </MainLayout>
  );
}
