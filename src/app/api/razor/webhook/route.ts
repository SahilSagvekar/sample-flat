// app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  // ✅ Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (!userId) {
      console.error("Missing userId in metadata");
      return new NextResponse("Missing metadata", { status: 400 });
    }

    try {
      await prisma.listingAccess.upsert({
        where: { userId },
        update: { hasAccess: true },
        create: {
          userId,
          hasAccess: true,
        },
      });

      console.log("✅ Access granted to user:", userId);
    } catch (err) {
      console.error("Failed to update DB:", err);
      return new NextResponse("DB Error", { status: 500 });
    }
  }

  return new NextResponse("Success", { status: 200 });
}
