import { Metadata } from "next";

import { createPageMetadata } from "@/app/metadata";
import MainLayout from "@/components/core/MainLayout";
import BlogCard from "@/components/core/Blog/BlogCard";
import SectionContainer from "@/components/containers/SectionContainer";
import { fetchBlogPosts } from "@/lib/blog";

export const metadata: Metadata = createPageMetadata({
  title: "Blog de psicologia deportiva | Pere Barceló",
  description:
    "Articulos y recursos sobre psicologia deportiva, rendimiento, salud mental y entrenamiento mental aplicados al deporte.",
  path: "/blog",
  imagePath: "/stock/alcanza-tu-objetivo.webp",
});

export default async function BlogListPage() {
  const posts = await fetchBlogPosts();

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
          <div className="grid grid-cols-1 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </SectionContainer>
      </main>
    </MainLayout>
  );
}
