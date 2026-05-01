import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import type { Post } from "@/types/blog";

export const useBlog = () => {
  const { blogId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetching post from Next.js API route (single post endpoint)
        const response = await fetch(`/api/blog/${blogId}`);
        const data = await response.json();
        setPost(data);
      } catch (_error) {
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [blogId]);

  return {
    post,
    loading,
  };
};
