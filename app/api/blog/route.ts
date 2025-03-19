import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract filters from query parameters
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const isFeatured = searchParams.get("isFeatured") === "true";
    const isPublished = searchParams.get("isPublished") === "true";
    const size = searchParams.get("size") ? parseInt(searchParams.get("size")!) : 10;
    const mostLiked = searchParams.get("mostLiked") === "true";
    const latest = searchParams.get("latest") === "true";

    // Build the filter object
    const where: any = {};
    if (category) where.category =  { equals: category };
    if (tag) where.tags = { some: { equals: tag } };
    if (typeof isFeatured === "boolean") where.isFeatured = isFeatured;
    if (typeof isPublished === "boolean") where.published = isPublished;

    // Build the orderBy array
    const orderBy: any[] = [];
    if (mostLiked) orderBy.push({ likeCount: "desc" });
    if (latest) orderBy.push({ updatedAt: "desc" });
    if (orderBy.length === 0) orderBy.push({ updatedAt: "desc" });

    const blogs = await db.blog.findMany({
      where,
      orderBy,
      take: size,
    });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      category,
      tags,
      content,
      excerpt,
      likeCount,
      featuredImage,
      isFeatured,
      published,
      publishedAt,
    } = body;

    const blog = await db.blog.create({
      data: {
        title,
        slug,
        category,
        tags,
        content,
        excerpt,
        isFeatured: isFeatured || false,
        likeCount: "0",
        featuredImage: "https://picsum.photos/500/300",
        published: published || false,
        publishedAt,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      slug,
      category,
      tags,
      content,
      excerpt,
      likeCount,
      isFeatured,
      featuredImage,
      published,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Blog post ID is required" },
        { status: 400 }
      );
    }

    const blog = await db.blog.update({
      where: { id: id },
      data: {
        title,
        slug,
        category,
        tags,
        content,
        excerpt,
        isFeatured: isFeatured ?? false,
        likeCount,
        featuredImage,
        published: published ?? false,
      },
    });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
