import Link from "next/link";
import Image from "next/image";

import { Post } from "@/types/blog";

interface Props {
    post: Post
}

const BlogCard = ({ post }: Props) => {

  function getFirstImageSrc(htmlContent: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const img = doc.querySelector('img');
    return img ? img.src : '';
  }

    return (
      <article className="group bg-background rounded-2xl shadow-card overflow-hidden border border-transparent hover:border-secondary/20 transition-all duration-500 ease-smooth hover:-translate-y-2 hover:shadow-card-hover">
        {getFirstImageSrc(post.content.rendered) && (
          <div className="relative h-56 overflow-hidden">
            <Image
              src={getFirstImageSrc(post.content.rendered)}
              alt={post.title.rendered}
              width={800}
              height={600}
              className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <h2
            className="text-xl font-bold text-text-dark mb-3 line-clamp-2 group-hover:text-primary-dark transition-colors duration-300"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div
            className="text-text-light mb-6 line-clamp-3 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
          <Link
            href={`/blog/${post.id}`}
            className="inline-flex items-center text-sm font-semibold text-primary-dark hover:text-secondary transition-colors duration-300"
          >
            Leer más <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </article>
    );
};

export default BlogCard;
