import { Post } from "@/types/blog";
import { wordpressBlogsJson } from "@/utils/data";

export const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

export async function fetchBlogPosts(limit = 6): Promise<Post[]> {
  const response = await fetch(`${wordpressBlogsJson}?_embed&per_page=${limit}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  return response.json();
}

export async function fetchBlogPost(blogId: string): Promise<Post | null> {
  const response = await fetch(`${wordpressBlogsJson}/${blogId}?_embed`, {
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
