import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();

  // Optionally restrict to admin
  // if (userId !== "user_admin123") {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const updatedProperty = await prisma.property.update({
      where: { id: params.id },
      data: { status: "approved" },
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Error approving property:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
