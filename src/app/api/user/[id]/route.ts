import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, props) {
  const params = await props.params;
  const userId = params.id;

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