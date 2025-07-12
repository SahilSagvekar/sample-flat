import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { BuyerProfileForm } from "@/components/forms/buyer-profile-form";

export default async function BuyerProfilePage() {
  const { userId } = await auth();
  const profile = await prisma.buyerProfile.findUnique({ where: { userId } });

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Buyer Profile</h2>
      <BuyerProfileForm initialData={profile} />
    </div>
  );
}
