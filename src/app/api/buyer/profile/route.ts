import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      clerkId: true,
      name: true,
      email: true,
      phone: true,
      city: true,
      location: true,
      image: true,
      role: true,
    },
  });

  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const targetUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!targetUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Allow self or admin to update
  const isOwner = targetUser.clerkId === userId;
  const isAdmin = targetUser.role === "admin";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = await prisma.user.update({
    where: { clerkId: userId },
    data: {
      name: body.name,
      phone: body.phone,
      city: body.city,
      location: body.location,
      email: body.email,
      image: body.image,
    },
  });

  return NextResponse.json(updated);
}
