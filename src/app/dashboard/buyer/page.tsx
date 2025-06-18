import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/shared/property-card";


export default async function BuyerDashboardPage() {
  
  
  const properties = await prisma.property.findMany({
    where: {
      status: "approved",
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Explore Properties</h1>
      {properties.length === 0 ? (
        <p>No listings found.</p>
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
