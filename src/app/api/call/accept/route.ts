// POST /api/call/accept
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { callId } = await req.json();

  // Create Daily room
  const dailyRes = await fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties: { exp: Math.floor(Date.now() / 1000) + 3600 } }),
  });

  const dailyData = await dailyRes.json();
  const roomUrl = dailyData.url;

  await prisma.callRequest.update({
    where: { id: callId },
    data: {
      status: "accepted",
      roomUrl,
    },
  });

  return NextResponse.json({ roomUrl });
}
