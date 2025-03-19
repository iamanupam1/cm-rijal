import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { RouteModuleHandleContext } from "next/dist/server/route-modules/route-module";

export async function GET(
  request: Request,
  context: RouteModuleHandleContext
)  {
  const { params } = await context.params;
  const { id } = params;
  try {
    const blog = await db.blog.findUnique({
      where: {
        id: id,
      },
    });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
