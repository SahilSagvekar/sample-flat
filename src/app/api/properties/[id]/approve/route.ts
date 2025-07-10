import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, context: any) {
  const { id } = context.params;

  await prisma.property.update({
    where: { id },
    data: { status: "approved" },
  });

  return NextResponse.redirect(new URL("/dashboard/admin", req.url));
}