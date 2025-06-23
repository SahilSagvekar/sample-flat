import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const propertyId = params.id;

  await prisma.property.update({
    where: { id: propertyId },
    data: { status: "approved" },
  });

  return NextResponse.redirect(new URL("/dashboard/admin", req.url));
}
