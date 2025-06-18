import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { propertyId, sellerId, date, type } = await req.json();

    const appointment = await prisma.appointment.create({
      data: {
        buyerId: userId,
        sellerId,
        propertyId,
        type,
        date: new Date(date),
      },
    });

    return NextResponse.json({ success: true, appointment });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
