import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function CheckoutSuccessPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const existing = await prisma.listingAccess.findUnique({ where: { userId } });

  if (!existing) {
    await prisma.listingAccess.create({
      data: { userId },
    });
  }

  redirect("/dashboard/seller/add");
}
