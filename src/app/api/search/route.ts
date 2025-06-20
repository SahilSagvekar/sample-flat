import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { city } = body;

    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    const results = await prisma.property.findMany({
      where: {
        city: {
          contains: city,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
