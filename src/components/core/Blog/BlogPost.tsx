import Image from "next/image";

import { Post } from "@/types/blog";

interface Props {
    post: Post;
}

const BlogPost = ({ post }: Props) => {
    return (
        <article className="">
            {post._embedded?.["wp:featuredmedia"] && (
                <Image
                    className="w-full h-96 object-cover rounded-lg mb-8"
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={post.title.rendered}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            )}
            <h1
                className="blog-title text-4xl font-bold mb-6"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
                className="blog-content max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
        </article>
    )
};

export default BlogPost;