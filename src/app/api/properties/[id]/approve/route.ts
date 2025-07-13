import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/")[3]; // ✅ [3] is the property ID in the route: /properties/[id]/approve

  if (!id) {
    return NextResponse.json({ error: "Missing property ID" }, { status: 400 });
  }

  await prisma.property.update({
    where: { id },
    data: { status: "approved" },
  });

  return NextResponse.json({ message: "Property approved successfully" });
}
