import { NextResponse } from "next/server";

import { fetchBlogPosts } from "@/lib/blog";

export async function GET() {
  try {
    const data = await fetchBlogPosts();
    return NextResponse.json(data);
  } catch (_error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
