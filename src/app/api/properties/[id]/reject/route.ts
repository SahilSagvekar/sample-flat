import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, props) {
  const params = await props.params;
  await prisma.property.update({
    where: { id: params.id },
    data: { status: "rejected" },
  });

  return NextResponse.redirect(new URL("/dashboard/admin", req.url));
}