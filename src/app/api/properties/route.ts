import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { geocodeAddress } from "@/lib/geocode";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const data = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 📍 Get latitude and longitude for mapping
    const fullAddress = `${data.locality}, ${data.city}, ${data.state}`;
    const { latitude, longitude } = await geocodeAddress(fullAddress);

    const property = await prisma.property.create({
      data: {
        sellerId: userId,
        title: data.title,
        houseNo: data.houseNo,
        city: data.city,
        state: data.state,
        locality: data.locality,
        bhk: data.bhk,
        price: Number(data.price),
        possessionDate: data.possessionDate,
        description: data.description,
        amenities: data.amenities?.split(",") ?? [],
        bedrooms: data.bedrooms || "0",
        bathrooms: data.bathrooms || "0",
        balconies: data.balconies || "0",
        carpetArea: data.carpetArea,
        builtupArea: data.builtupArea,
        superBuiltupArea: data.superBuiltupArea,
        ownershipStatus: data.ownershipStatus,
        availabilityStatus: data.availabilityStatus,
        sampleFlatVideo: data.sampleFlatVideo,
        localityVideo: data.localityVideo,
        imageUrls: data.imageUrls ?? [],
        status: "pending",
        latitude,
        longitude,
      },
    });

    return NextResponse.json({ success: true, property });
  } catch (err: any) {
    console.error("❌ Property Creation Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const location = searchParams.get("location");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const propertyType = searchParams.get("propertyType");
  const bedrooms = searchParams.get("bedrooms");

  const filters: any = {};

  if (location) {
    filters.OR = [
      { title: { contains: location, mode: "insensitive" } },
      { locality: { contains: location, mode: "insensitive" } },
      { city: { contains: location, mode: "insensitive" } },
    ];
  }

  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.gte = parseInt(minPrice);
    if (maxPrice) filters.price.lte = parseInt(maxPrice);
  }

  if (propertyType) {
    filters.propertyType = propertyType;
  }

  if (bedrooms) {
    filters.bedrooms = parseInt(bedrooms);
  }

  try {
    const properties = await prisma.property.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(properties);
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    return NextResponse.json({ error: "Error fetching properties" }, { status: 500 });
  }
}
