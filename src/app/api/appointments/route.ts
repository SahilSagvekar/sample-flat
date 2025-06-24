import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { addHours } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { propertyId, sellerId, date, type } = await req.json();

  const appointment = await prisma.appointment.create({
    data: {
      buyerId: userId,
      sellerId,
      propertyId,
      date: new Date(date),
      type,
    },
  });

  const [buyer, seller] = await Promise.all([
    prisma.user.findUnique({ where: { clerkId: userId } }),
    prisma.user.findUnique({ where: { clerkId: sellerId } }),
  ]);

  const toEmails = [buyer?.email, seller?.email].filter(Boolean) as string[];

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: toEmails.length ? toEmails : ["sahilsagvekar230@gmail.com"],
      subject: "Appointment Requested",
      html: `<p>${buyer?.name || "A buyer"} requested a ${type === "site" ? "site visit" : "video call"} on ${new Date(date).toLocaleString()}.</p>`,
    });

    // Reminder Email (Scheduled 24 hours before)
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: toEmails,
      subject: "Reminder – Upcoming Appointment",
      html: `<p>Your appointment is coming up tomorrow at ${new Date(date).toLocaleString()}.</p>`,
      scheduledAt: addHours(new Date(date), -24).toISOString(),
    });

  } catch (err) {
    console.error("❌ Email failed to send:", err);
    console.log("Sending to:", toEmails);
  }

  return NextResponse.json({ success: true, appointment });
}
