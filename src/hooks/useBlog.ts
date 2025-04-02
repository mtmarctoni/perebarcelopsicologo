import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Post } from "@/types/blog";
import { wordpressBlogsJson } from "@/utils/data";

export const useBlog = () => {
    const { blogId } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Fetching post with embedded data (images...)
                const response = await fetch(
                    `${wordpressBlogsJson}/${blogId}?_embed`
                );
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [blogId]);

    return {
        post,
        loading
    };
};