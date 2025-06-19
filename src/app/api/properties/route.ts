import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const property = await prisma.property.create({
      data: {
        title: data.title,
        price: parseFloat(data.price),
        bhk: data.bhk,
        possessionDate: data.possessionDate,
        amenities: data.amenities
          ? data.amenities.split(",").map((a: string) => a.trim())
          : [],
        city: data.city,
        state: data.state,
        locality: data.locality,
        sampleFlatVideo: data.sampleFlatVideo,
        localityVideo: data.localityVideo,
        status: "pending",
        sellerId: data.sellerId,
        images: data.images || [], // ✅ New line to save image URLs
      },
    });

    return NextResponse.json({ success: true, property });
  } catch (err: any) {
    console.log("❌ Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
