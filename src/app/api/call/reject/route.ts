// POST /api/call/reject
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { callId } = await req.json();

  await prisma.callRequest.update({
    where: { id: callId },
    data: { status: "rejected" },
  });

  return NextResponse.json({ success: true });
}
