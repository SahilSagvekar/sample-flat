import { prisma } from "@/lib/prisma";
import BookTourButton from "@/components/BookTourButton";
import Link from "next/link";

export default async function TopProperties() {
  const properties = await prisma.property.findMany({
    where: { status: "approved" },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { seller: true },
  });

  if (properties.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No listings available yet.
      </div>
    );
  }

  return (
    <section className="bg-[#f0f8f6] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
          🏗 Top New Launches
        </h2>

        {/* Full-width scrollable section */}
        <div className="overflow-x-auto">
          <div className="flex gap-6 px-2 w-full">
            {properties.map((property) => (
              <div
                key={property.id}
                className="min-w-[240px] max-w-[240px] flex-shrink-0 border bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={
                    property.imageUrls?.[0] ||
                    "https://via.placeholder.com/240x150"
                  }
                  alt={property.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{property.title}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {property.locality || "—"} · {property.seller?.email || "Seller"}
                  </p>
                  <p className="text-sm mt-2">🛏 {property.bhk} BHK</p>
                  <p className="text-sm">📆 {property.possessionDate || "—"}</p>
                  <p className="text-sm font-bold mt-1 text-green-700">
                    ₹{property.price}
                    <span className="text-xs text-gray-500"> (All Inc)</span>
                  </p>

                  <div className="mt-4">
                    <BookTourButton propertyId={property.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
