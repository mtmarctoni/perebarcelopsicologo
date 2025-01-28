"use client";
import { useBlog } from "@/hooks/useBlog";
import SectionContainer from "@/components/containers/SectionContainer";
import MainLayout from "@/components/core/MainLayout";
import BlogSkeleton from "@/components/core/Blog/BlogSkeleton";
import BlogPost from "@/components/core/Blog/BlogPost";

export default function BlogPage() {
  const { post, loading } = useBlog();

  if (loading) return <BlogSkeleton />;
  if (!post) return <div>Post not found</div>;

  return (
    <MainLayout>
      <SectionContainer className="bg-primary-light">
        <BlogPost post={post} />
      </SectionContainer>
      {/* Añadir CTA con botón a contacto u otro sitio */}
    </MainLayout>
  );
}
