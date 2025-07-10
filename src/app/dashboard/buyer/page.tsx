import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/shared/property-card";

export default async function BuyerDashboardPage() {
  const properties = await prisma.property.findMany({
    where: {
      // status: "approved",
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold">Explore Verified Properties</h1> */}
        <p className="text-sm text-muted-foreground">
          {properties.length} listings found
        </p>
      </div>

      {properties.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No listings available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={{
                ...property,
                price: property.price ?? 0, // fallback for null
                bhk: property.bhk ?? "", // if bhk is nullable too
                city: property.city ?? "", // if city is nullable
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// import { prisma } from "@/lib/prisma";
// import PropertyCard from "@/components/shared/property-card";

// export default async function BuyerDashboardPage() {

//   const properties = await prisma.property.findMany({
//     where: {
//       status: "approved",
//     },
//     orderBy: { createdAt: "desc" },
//   });

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-bold">Explore Properties</h1>
//       {properties.length === 0 ? (
//         <p>No listings found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {properties.map((property) => (
//             <PropertyCard key={property.id} property={property} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
