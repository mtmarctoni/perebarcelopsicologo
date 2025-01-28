import { useEffect, useState } from "react";

import { Post } from "@/types/blog";
import { wordpressBlogsJson } from "@/utils/data";

export const useBlogList = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetching max 6 posts with embedded content (images...)
                const response = await fetch(`${wordpressBlogsJson}/?_embed&per_page=6`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
  
        fetchPosts();
    }, []);

    return {
        posts,
        loading
    }
}