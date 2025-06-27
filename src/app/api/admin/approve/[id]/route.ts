import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // Update the property status
    await prisma.property.update({
      where: { id },
      data: { status: "approved" },
    });

    // Redirect to admin dashboard
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  } catch (error) {
    console.error("Approval failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}