import Link from "next/link";
import Image from "next/image";

import { Post } from "@/types/blog";

interface Props {
    post: Post
}

const BlogCard = ({ post }: Props) => {
    return (
      <article className="bg-background-alt rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        {post._embedded?.['wp:featuredmedia'] && (
          <Image
            src={post._embedded['wp:featuredmedia'][0].source_url}
            alt={post.title.rendered}
            width={800}
            height={400}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <h2 
            className="text-xl font-bold text-text-dark mb-3 line-clamp-2" 
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
          />
          <div 
            className="text-text-light mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
          />
          <Link 
            href={`/blog/${post.id}`}
            className="inline-block px-4 py-2 bg-primary-dark text-white rounded-lg hover:bg-secondary transition-colors"
          >
            Leer más
          </Link>
        </div>
      </article>
    );
};
  
export default BlogCard;