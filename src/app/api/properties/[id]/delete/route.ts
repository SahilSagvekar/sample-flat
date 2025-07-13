import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/")[3]; // ✅ Extract property ID from /properties/[id]/delete

  if (!id) {
    return NextResponse.json({ error: "Missing property ID" }, { status: 400 });
  }

  try {
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
