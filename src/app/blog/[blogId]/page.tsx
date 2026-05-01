import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createPageMetadata } from "@/app/metadata";
import SectionContainer from "@/components/containers/SectionContainer";
import MainLayout from "@/components/core/MainLayout";
import BlogPost from "@/components/core/Blog/BlogPost";
import { fetchBlogPost, stripHtml } from "@/lib/blog";

interface BlogPageProps {
  params: Promise<{ blogId: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { blogId } = await params;
  const post = await fetchBlogPost(blogId);

  if (!post) {
    return createPageMetadata({
      title: "Articulo no encontrado | Pere Barceló",
      description: "El articulo solicitado no esta disponible o ya no existe.",
      path: `/blog/${blogId}`,
      imagePath: "/stock/alcanza-tu-objetivo.webp",
    });
  }

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return createPageMetadata({
    title: `${stripHtml(post.title.rendered)} | Blog de Pere Barceló`,
    description: stripHtml(post.excerpt.rendered),
    path: `/blog/${blogId}`,
    imageUrl: featuredImage,
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { blogId } = await params;
  const post = await fetchBlogPost(blogId);

  if (!post) {
    notFound();
  }

  return (
    <MainLayout>
      <SectionContainer className="bg-primary-light">
        <BlogPost post={post} />
      </SectionContainer>
      {/* Añadir CTA con botón a contacto u otro sitio */}
    </MainLayout>
  );
}
