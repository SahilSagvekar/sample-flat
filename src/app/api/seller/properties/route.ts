// /api/seller/properties.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify([]), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const properties = await prisma.property.findMany({
    where: { sellerId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      bhk: true,
      price: true,
      city: true,
      state: true,
      imageUrls: true,
      status: true,
      paymentStatus: true,
      createdAt: true,
    },
  });

  return new Response(JSON.stringify(properties), {
    headers: { "Content-Type": "application/json" },
  });
}
