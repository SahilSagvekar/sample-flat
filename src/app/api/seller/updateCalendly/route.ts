import { auth } from "@clerk/nextjs/server"; // Assuming you're using Clerk
import { prisma } from "@/lib/prisma"; // Your Prisma client

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { calendlyLink } = await req.json();

  await prisma.user.update({
    where: { id: userId },
    data: { calendlyLink },
  });

  return new Response("OK");
}
