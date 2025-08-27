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
        // Fetching post from Next.js API route (single post endpoint)
        const response = await fetch(`/api/blog/${blogId}`);
        const data = await response.json();
        console.log("data", data);
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
    loading,
  };
};
