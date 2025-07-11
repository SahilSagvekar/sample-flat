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

  const payload = await req.text();
  const body = JSON.parse(payload);

  try {
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    wh.verify(payload, svixHeaders);

    const {
      id, // this is the Clerk user ID
      email_addresses,
      public_metadata,
    } = body.data;

    const email = email_addresses?.[0]?.email_address || '';
    const role = public_metadata?.role || 'buyer'; // fallback role if missing
    const clerkId = id;

    console.log('✅ Webhook received. Creating user with:');
    console.log({ id, email, clerkId, role });

    await prisma.user.create({
      data: {
        id,
        clerkId,
        email,
        role,
      },
    });

    console.log('✅ User saved to DB');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook verification failed or DB error:', error);
    return new NextResponse('Webhook signature invalid or DB error', { status: 400 });
  }
}
