// src/app/api/favorites/[propertyId]/route.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { propertyId: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.favorite.deleteMany({
    where: {
      userId,
      propertyId: params.propertyId,
    },
  });

  return NextResponse.json({ message: "Unfavorited" });
}
