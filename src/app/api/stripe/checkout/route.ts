import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.redirect("/sign-in");

  const { propertyId } = await req.json(); // This will be passed only when boosting a listing

  let priceInPaise = 9900; // ₹99 by default
  let metadata: any = {
    userId,
    type: "listing",
  };

  if (propertyId) {
    priceInPaise = 4900; // ₹49 to feature
    metadata = {
      ...metadata,
      type: "feature",
      propertyId,
    };
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "inr",
          unit_amount: priceInPaise,
          product_data: {
            name: propertyId ? "Feature Property Listing" : "Seller Listing Access",
          },
        },
        quantity: 1,
      },
    ],
    metadata,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/seller`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/seller?error=payment-cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
