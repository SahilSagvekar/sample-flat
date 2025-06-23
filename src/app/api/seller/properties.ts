// /api/seller/properties.ts
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response(JSON.stringify([]), { status: 401 });
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
      status: true,
      paymentStatus: true,
    },
  });

  return new Response(JSON.stringify(properties));
}
