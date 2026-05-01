import Image from "next/image";

import type { Post } from "@/types/blog";

interface Props {
  post: Post;
}

const BlogPost = ({ post }: Props) => {
  return (
    <article className="max-w-4xl mx-auto">
      {post._embedded?.["wp:featuredmedia"] && (
        <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden mb-10 shadow-card">
          <Image
            className="object-cover"
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={post.title.rendered}
            fill
            sizes="100vw"
          />
        </div>
      )}
      <h1 className="blog-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div
        className="blog-content max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
};

export default BlogPost;
