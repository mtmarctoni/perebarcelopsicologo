import { NextResponse } from "next/server";

import { fetchBlogPost } from "@/lib/blog";

export async function GET(_request: Request, { params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = await params;
  try {
    const data = await fetchBlogPost(blogId);

    if (!data) {
      return NextResponse.json({ error: "Failed to fetch post" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (_error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
