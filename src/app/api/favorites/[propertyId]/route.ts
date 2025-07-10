import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { propertyId: string } }
) {
  const { userId } = await auth(); // No need for `await` here

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { propertyId } = context.params;

  await prisma.favorite.deleteMany({
    where: {
      userId,
      propertyId,
    },
  });

  return NextResponse.json({ message: "Unfavorited" });
}
