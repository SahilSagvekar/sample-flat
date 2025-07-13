import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail"; // Make sure this utility exists

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { seller: true },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    await prisma.property.delete({ where: { id: propertyId } });

    // Send rejection email
    await sendMail({
      to: property.seller?.email || "", // Fallback if no email
      subject: "Your Property Listing Was Rejected",
      text: `Hello,

We regret to inform you that your property titled "${property.title}" has been rejected by the admin.

You may review the details and try listing it again.

- SampleFlat Team`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Rejection failed:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
