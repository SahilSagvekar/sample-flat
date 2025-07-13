import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Delete the property with the given ID
    await prisma.property.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Property deleted" });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete property" },
      { status: 500 }
    );
  }
}
