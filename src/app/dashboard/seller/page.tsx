import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/shared/property-card";

export default async function SellerDashboardPage() {
  const user = await currentUser();

  if (!user) return <div className="p-6">Please sign in to view your dashboard.</div>;

  const properties = await prisma.property.findMany({
    where: { sellerId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Listings</h1>

      {properties.length === 0 ? (
        <p>No listings yet. <a href="/dashboard/seller/add" className="underline">Add one now</a>.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
