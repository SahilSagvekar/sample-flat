import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const userId = segments[segments.length - 1];

  if (!userId) {
    return new NextResponse("Missing user ID", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      calendlyLink: true,
    },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  return NextResponse.json(user);
}
