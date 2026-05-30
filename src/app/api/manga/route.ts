import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Manga } from "@/models/Manga";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const sort = searchParams.get("sort") || "-createdAt";
    
    const mangas = await Manga.find().sort(sort).limit(limit).lean();
    return NextResponse.json({ success: true, data: mangas });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Auto-generate slug if not provided
    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    const newManga = await Manga.create(body);
    return NextResponse.json({ success: true, data: newManga }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
