import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { razorpay_order_id, razorpay_payment_id, propertyId } = await req.json();

  if (!razorpay_payment_id || !propertyId) {
    return new NextResponse("Missing info", { status: 400 });
  }

  try {
    await prisma.property.update({
      where: { id: propertyId },
      data: { featured: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feature update error:", error);
    return new NextResponse("Failed to update property", { status: 500 });
  }
}
