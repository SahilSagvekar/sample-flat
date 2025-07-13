// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";
// import PropertyCard from "@/components/shared/property-card";

// export default async function BuyerDashboardPage() {
//   const { userId } = await auth();

//   if (!userId) {
//     return <div className="p-6">Unauthorized</div>;
//   }

//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   const properties = await prisma.property.findMany({
//     orderBy: { createdAt: "desc" },
//   });

//   return (
//     <div className="p-6 space-y-8 max-w-5xl mx-auto">
//       {/* Profile Header */}
//       <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
//         {user?.profileImage && (
//           <img
//             src={user.profileImage}
//             alt="Profile"
//             className="w-20 h-20 rounded-full object-cover border"
//           />
//         )}
//         <div>
//           <h1 className="text-2xl font-bold">{user?.name || "Buyer"}</h1>
//           <p className="text-sm text-gray-600">{user?.email}</p>
//           <p className="text-sm text-gray-500">City: {user?.city || "N/A"}</p>
//         </div>
//       </div>

//       {/* Property Listings */}
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">All Properties</h2>
//           <p className="text-sm text-muted-foreground">
//             {properties.length} listings found
//           </p>
//         </div>

//         {properties.length === 0 ? (
//           <p className="text-gray-500 text-sm">
//             No listings available at the moment.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {properties.map((property) => (
//               <PropertyCard
//                 key={property.id}
//                 property={{
//                   ...property,
//                   price: property.price ?? 0,
//                   bhk: property.bhk ?? "",
//                   city: property.city ?? "",
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { Suspense } from "react";
import BuyerDashboardClient from "@/components/dashboard/BuyerDashboardClient";

export default function SellerDashboardPage() {
  return (
    <div className="p-6">
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <BuyerDashboardClient />
      </Suspense>
    </div>
  );
}
