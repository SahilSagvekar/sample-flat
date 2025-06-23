// src/app/api/favorites/[propertyId]/route.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { propertyId: string } };

export async function DELETE(req: Request, { params }: Params) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.favorite.deleteMany({
    where: {
      userId,
      propertyId: params.propertyId,
    },
  });

  return NextResponse.json({ message: "Unfavorited" });
}
