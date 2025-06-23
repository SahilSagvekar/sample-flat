"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SellerDashboard() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handlePayment = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Seller Dashboard</h1>

      {error === "access-denied" && (
        <p className="text-red-600">❌ You need to pay ₹99 to list a property.</p>
      )}

      <Button onClick={handlePayment}>Pay ₹99 to List Your Property</Button>


      
    </div>


  );
}













// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";
// // import { Button } from "@/components/ui/button";
// import PropertyCard from "@/components/shared/property-card";

// export default async function SellerDashboardPage() {
//   const { userId } = await auth(); // ✅ this is good
//   if (!userId) return null;

//   const properties = await prisma.property.findMany({
//     where: { sellerId: userId }, // ✅ userId is a string
//     orderBy: { createdAt: "desc" },
//     select: {
//       id: true,
//       title: true,
//       bhk: true,
//       price: true,
//       city: true,
//       state: true,
//       status: true,
//       sellerId: true, // ✅ important for delete/edit logic
//       sampleFlatVideo: true,
//       localityVideo: true,
//     },
//   });

//   return (
//     <div className="grid gap-4">
//       {properties.map((property) => (
//         <PropertyCard
//           key={property.id}
//           property={property}
//           currentUserId={userId} // ✅ pass it in!
//         />
//       ))}

//       {/* <Button
//         onClick={async () => {
//           const res = await fetch("/api/stripe/checkout", {
//             method: "POST",
//           });
//           const data = await res.json();
//           if (data.url) window.location.href = data.url;
//           else alert("Failed to create checkout session");
//         }}
//       >
//         Pay ₹99 to List Your Property
//       </Button> */}
//     </div>
//   );
// }
