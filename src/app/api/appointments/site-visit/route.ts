// app/api/appointments/site-visit/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { buyerEmail, sellerEmail, date, time } = await req.json();

  const formattedDateTime = `${date} at ${time}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NOTIFY_EMAIL,
      pass: process.env.NOTIFY_PASS,
    },
  });

  const mailOptions = {
    from: process.env.NOTIFY_EMAIL,
    to: `${buyerEmail}, ${sellerEmail}`,
    subject: "📍 Site Visit Scheduled",
    text: `You have a site visit scheduled on ${formattedDateTime}.\n\nPlease coordinate accordingly.\n\n- Buyer Builder Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
