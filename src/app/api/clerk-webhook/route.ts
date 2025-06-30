import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Webhook } from "svix";
import { headers } from "next/headers";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_SECOND!;

export async function POST(req: Request) {
  const payload = await req.text(); // raw body
  const headerPayload = headers(); // for svix headers

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id") ?? "",
    "svix-timestamp": headerPayload.get("svix-timestamp") ?? "",
    "svix-signature": headerPayload.get("svix-signature") ?? "",
  };

  let evt;
  try {
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    evt = wh.verify(payload, svixHeaders); // Clerk verification
  } catch (err) {
    console.error("❌ Clerk webhook signature verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const event = evt;

  // Handle user.deleted
  if (event.type === "user.deleted") {
    const clerkId = event.data.id;
    try {
      await prisma.user.deleteMany({
        where: { clerkId },
      });
      console.log(`✅ Deleted user from DB with clerkId: ${clerkId}`);
    } catch (error) {
      console.error("❌ DB error:", error);
    }
  }

  return NextResponse.json({ success: true });
}
