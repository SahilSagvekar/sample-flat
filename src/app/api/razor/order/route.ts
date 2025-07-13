import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { auth } from "@clerk/nextjs/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID!,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { propertyId } = await req.json();

    if (!userId || !propertyId) {
      return new NextResponse(JSON.stringify({ error: 'Missing params' }), { status: 400 });
    }

    const amount = 9900; // ₹99 in paise

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `receipt_order_${propertyId}`,
      notes: { propertyId },
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return new NextResponse(JSON.stringify({ error: "Razorpay order failed" }), { status: 500 });
  }
}
