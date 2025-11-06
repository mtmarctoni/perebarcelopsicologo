import { NextResponse } from "next/server";

const BASE_URL = "https://blog.perebarcelopsicologo.com/wp-json/wp/v2/posts";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ blogId: string }> }
) {
  const { blogId } = await params;
  try {
    const res = await fetch(`${BASE_URL}/${blogId}?_embed`, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch post" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
