import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import PropertyCard from "@/components/shared/property-card"; // make sure this exists and works

export default async function AdminPage() {
  const { userId } = await auth();

  // ❗ Replace with your Clerk user ID to restrict admin access
  // const adminId = "user_2ydcnlDbTT7beNE55ui8p1VjphE"; // e.g. "user_abc123"
  // if (userId !== adminId) {
  //   redirect("/"); // not authorized
  // }

  const properties = await prisma.property.findMany({
    include: {
      seller: true, // assumes your `property` model has a relation to User
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard: Listings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="border p-4 rounded-xl relative">
            <PropertyCard property={property} />

            <p className="text-xs text-gray-500 mt-2">
              Seller: {property.seller?.email || "Unknown"}
            </p>

            {/* Delete Button */}
            <DeleteButton propertyId={property.id} />
              <button
                type="submit"
                className="mt-3 text-red-600 text-sm underline hover:text-red-800"
              >
                {/* Delete Listing */}
              </button>
          </div>
        ))}
      </div>
    </div>
  );
}
