import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Tag name is required" },
        { status: 400 }
      );
    }

    const tag = await db.tag.create({
      data: { name },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create tag" },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

export async function GET() {
  try {
    const tags = await db.tag.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get tag" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
