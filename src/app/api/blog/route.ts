import { NextResponse } from "next/server";
import { wordpressBlogsJson } from "@/utils/data";

export async function GET() {
  try {
    const res = await fetch(`${wordpressBlogsJson}?_embed&per_page=6`);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch posts" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
