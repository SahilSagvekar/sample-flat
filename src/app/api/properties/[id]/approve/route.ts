import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Context = { params: { id: string } };

export async function POST(req: Request, context: Context) {
  await prisma.property.update({
    where: { id: context.params.id },
    data: { status: "approved" },
  });

  return NextResponse.redirect(new URL("/dashboard/admin", req.url));
}