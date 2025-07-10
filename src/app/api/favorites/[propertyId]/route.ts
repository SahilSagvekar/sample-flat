import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse, type RouteHandlerContext } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: RouteHandlerContext
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { propertyId } = (await context.params);

  await prisma.favorite.deleteMany({
    where: {
      userId,
      propertyId,
    },
  });

  return NextResponse.json({ message: "Unfavorited" });
}