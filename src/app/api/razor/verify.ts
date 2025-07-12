// app/api/razorpay/verify/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");

  if (generatedSignature !== razorpaySignature) {
    return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
  }

  // ✅ Update the `paid` field for the logged-in user
  // You need to get the current user ID, assuming it's stored in session/token/etc.

  // const userId = /* logic to get logged-in user ID (e.g. from cookies or headers) */;
  const { userId } = await auth();
  console.log(userId);

  if (!userId) {
    console.log("Unauthorized");
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await prisma.user.update({
    where: { clerkId: userId },
    // where: { id: userId },
    data: { paid: true },
  });

  console.log("user updated");
  return NextResponse.json({ success: true });
}
