import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { geocodeAddress } from "@/lib/geocode";

function getPropertyIdFromUrl(req: Request): string | null {
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  return segments[segments.length - 1] || null;
}

export async function GET(req: Request) {
  const id = getPropertyIdFromUrl(req);
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  try {
    const property = await prisma.property.findUnique({ where: { id } });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, property });
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = getPropertyIdFromUrl(req);
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // 🔐 Optional: Only allow admin or listing owner
  if (property.sellerId !== userId && userId !== "your_admin_id") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.property.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const id = getPropertyIdFromUrl(req);
  if (!id) return new NextResponse("Missing ID", { status: 400 });

  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const data = await req.json();

  const fullAddress = `${data.locality}, ${data.city}, ${data.state}`;
  const { latitude, longitude } = await geocodeAddress(fullAddress);

  const updated = await prisma.property.update({
    where: { id },
    data: {
      ...data,
      price: Number(data.price),
      amenities: data.amenities?.split(",") ?? [],
      latitude,
      longitude,
    },
  });

  return NextResponse.json(updated);
}
