// /api/seller/properties.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify([]), { status: 401 });
  }

  const properties = await prisma.property.findMany({
    where: { sellerId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      // description: true,       // 🆕 In case PropertyCard uses it
      bhk: true,
      price: true,
      city: true,
      state: true,
      imageUrls: true,            // 🆕 Needed for thumbnails
      status: true,
      paymentStatus: true,
      createdAt: true,
    },
  });

  return new Response(JSON.stringify(properties));
}
