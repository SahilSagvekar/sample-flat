import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract propertyId from the URL
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const propertyId = segments[segments.length - 1];

  if (!propertyId) {
    return NextResponse.json({ error: "Missing propertyId" }, { status: 400 });
  }

  await prisma.favorite.deleteMany({
    where: {
      userId,
      propertyId,
    },
  });

  return NextResponse.json({ message: "Unfavorited" });
}
