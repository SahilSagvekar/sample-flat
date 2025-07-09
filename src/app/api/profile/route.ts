import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();

  await prisma.user.update({
    where: { id: userId },
    data: {
      name: body.name,
      phone: body.phone,
      location: body.location,
      bio: body.bio,
      company: body.company,
      website: body.website,
      about: body.about,
    },
  });

  return new Response("OK", { status: 200 });
}
