// GET /api/call/incoming?sellerId=xxx
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sellerId = searchParams.get("sellerId");

  if (!sellerId) return NextResponse.json({ roomUrl: null });

  const call = await prisma.callRequest.findFirst({
    where: {
      sellerId,
      status: "pending",
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(call || {});
}
