// POST /api/call/request
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await auth();
  const { sellerId } = await req.json();

  if (!userId || !sellerId) {
    return NextResponse.json({ error: "Unauthorized or missing sellerId" }, { status: 401 });
  }

  const call = await prisma.callRequest.create({
    data: {
      buyerId: userId,
      sellerId,
    },
  });

  return NextResponse.json({ success: true, callId: call.id });
}
