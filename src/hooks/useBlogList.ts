import { useEffect, useState } from "react";

import type { Post } from "@/types/blog";

export const useBlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetching max 6 posts from Next.js API route (list endpoint)
        const response = await fetch("/api/blog");
        const data = await response.json();
        setPosts(data);
      } catch (_error) {
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return {
    posts,
    loading,
  };
};
