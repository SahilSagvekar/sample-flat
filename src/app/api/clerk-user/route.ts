import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { Prisma } from '@prisma/client';

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

type ClerkEvent = {
  data: {
    id: string;
    email_addresses: { email_address: string }[];
    // unsafe_metadata: {
    //   name?: string;
    //   phone?: string;
    //   role?: string;
    // };
    public_metadata: {
      role?: string;
      name?: string;
      phone?: string;
    };
  };
  type: string;
};

export async function POST(req: Request) {
  const headerPayload = await headers();

  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id') || '',
    'svix-timestamp': headerPayload.get('svix-timestamp') || '',
    'svix-signature': headerPayload.get('svix-signature') || '',
  };

  const payload = await req.text();

  try {
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payload, svixHeaders) as ClerkEvent;

    const user = evt.data;

    const email = user.email_addresses?.[0]?.email_address || '';
    const name = user.public_metadata?.name || '';
    const phone = user.public_metadata?.phone || '';
    const role = user.public_metadata?.role || 'buyer';
    const clerkId = user.id;

    const newUser: Prisma.UserCreateInput = {
  id: clerkId, // Using Clerk ID as DB ID
  email,
  name,
  phone,
  role,
  clerkId,
};


    await prisma.user.create({ data: newUser });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error in webhook:', error);
    return new NextResponse('Webhook failed', { status: 400 });
  }
}
