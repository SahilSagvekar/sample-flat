import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail"; // ✅ Ensure this exists

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const propertyId = segments[3]; // /api/properties/[id]/reject

    if (!propertyId) {
      return NextResponse.json({ error: "Missing property ID" }, { status: 400 });
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { seller: true },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    await prisma.property.delete({ where: { id: propertyId } });

    if (property.seller?.email) {
      await sendMail({
        to: property.seller.email,
        subject: "Your Property Listing Was Rejected",
        text: `Hello,

We regret to inform you that your property titled "${property.title}" has been rejected by the admin.

You may review the details and try listing it again.

- SampleFlat Team`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Rejection failed:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
