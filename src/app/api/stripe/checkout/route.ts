import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ["card"],
  //   mode: "payment",
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: "inr",
  //         product_data: { name: "SampleFlat Property Listing Fee" },
  //         unit_amount: 9900,
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout-success`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/seller`,
  //   metadata: { userId },
  // });

  const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  mode: "payment",
  line_items: [
    {
      price_data: {
        currency: "inr",
        unit_amount: 9900, // ₹99
        product_data: {
          name: "Property Listing Access",
        },
      },
      quantity: 1,
    },
  ],
  metadata: {
    userId, // 👈 pass Clerk userId here
  },
  success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/seller/add`,
  cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/seller/pay-to-list`,
});


  return NextResponse.json({ url: session.url });
}
