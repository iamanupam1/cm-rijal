import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const category = await db.category.create({
      data: { name },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

export async function GET() {
  try {
    const category = await db.category.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get category" },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
