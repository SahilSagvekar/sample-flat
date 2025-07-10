// app/api/clerk-user/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id') || '',
    'svix-timestamp': headerPayload.get('svix-timestamp') || '',
    'svix-signature': headerPayload.get('svix-signature') || '',
  };

  const payload = await req.text(); // get raw body as text
  const body = JSON.parse(payload); // convert to JSON after verifying

  try {
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    wh.verify(payload, svixHeaders); // throws if invalid

    const { data } = body;

    const {
      id: clerkId,
      email_addresses,
      public_metadata,
    //   image_url,
    //   first_name,
    //   last_name,
    } = data;

    const email = email_addresses?.[0]?.email_address || '';
    const role = public_metadata?.role || '';
    // const name = `${first_name || ''} ${last_name || ''}`.trim();

    // Save user to your DB
    // await prisma.user.create({
    //   data: {
    //     clerkId,
    //     email,
    //     role,
    //     // name,
    //     // image: image_url,
    //   },
    // });

    await prisma.user.create({
      data: {
        clerkId,
        email,
        role,
      },
    });


    console.log("saved to db");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook verification failed:', error);
    return new NextResponse('Webhook signature invalid', { status: 400 });
  }
}
