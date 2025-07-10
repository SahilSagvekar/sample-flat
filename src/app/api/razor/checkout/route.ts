// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { prisma } from "@/lib/prisma";

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
// //   apiVersion: "2023-10-16",
// // });
// var instance = new Razorpay({ key_id: process.env.RAZOR_PAY_KEY_ID, key_secret: process.env.RAZOR_PAY_KEY_SECRET })

// export async function POST(req: Request) {
//   const { userId } = await auth();
//   if (!userId) return NextResponse.redirect("/sign-in");

//   const { propertyId } = await req.json(); // This will be passed only when boosting a listing

//   let priceInPaise = 9900; // ₹99 by default
//   let metadata: any = {
//     userId,
//     type: "listing",
//   };

//   if (propertyId) {
//     priceInPaise = 4900; // ₹49 to feature
//     metadata = {
//       ...metadata,
//       type: "feature",
//       propertyId,
//     };
//   }

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     line_items: [
//       {
//         price_data: {
//           currency: "inr",
//           unit_amount: priceInPaise,
//           product_data: {
//             name: propertyId ? "Feature Property Listing" : "Seller Listing Access",
//           },
//         },
//         quantity: 1,
//       },
//     ],
//     metadata,
//     success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/seller`,
//     cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/seller?error=payment-cancelled`,
//   });

//   return NextResponse.json({ url: session.url });
// }

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID!,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.redirect("/sign-in");

    const body = await req.json().catch(() => ({}));
    const { propertyId } = body;

    let amountInPaise = 100; // ₹99 default
    let notes: any = {
      userId,
      type: "listing",
    };

    if (propertyId) {
      amountInPaise = 4900;
      notes = {
        ...notes,
        type: "feature",
        propertyId,
      };
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
      notes,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZOR_PAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("Payment API error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


