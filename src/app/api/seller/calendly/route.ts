import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { calendlyLink } = await req.json();

  if (!calendlyLink || !calendlyLink.startsWith("https://")) {
    return new NextResponse("Invalid link", { status: 400 });
  }

  const user = await prisma.user.update({
    where: { clerkId: userId },
    data: { calendlyLink },
  });

  return NextResponse.json(user);
}
