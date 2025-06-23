import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { propertyId } = await req.json();
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });

    if (existing) {
      await prisma.favorite.delete({
        where: {
          userId_propertyId: {
            userId,
            propertyId,
          },
        },
      });

      return NextResponse.json({ message: "Removed from favorites" });
    } else {
      await prisma.favorite.create({
        data: {
          userId,
          propertyId,
        },
      });

      return NextResponse.json({ message: "Added to favorites" });
    }
  } catch (error) {
    console.error("❌ Error in favorites route:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

