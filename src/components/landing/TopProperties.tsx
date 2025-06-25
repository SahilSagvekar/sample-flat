import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function TopProperties() {
  const properties = await prisma.property.findMany({
    where: { status: "approved" }, // show only approved ones
    orderBy: { createdAt: "desc" },
    take: 6,
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex border bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={
                  property.imageUrls?.[0] ||
                  "https://via.placeholder.com/200x150"
                }
                alt={property.title}
                className="w-36 h-full object-cover"
              />

              <div className="flex flex-col justify-between p-4 w-full">
                <div>
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="text-sm text-gray-500">
                    {property.locality || "—"} ·{" "}
                    {property.seller?.email || "Seller"}
                  </p>
                  <p className="text-sm mt-2">🛏 {property.bhk} BHK</p>
                  <p className="text-sm">📐 {property.area || "N/A"} sqft</p>
                  <p className="text-sm">📆 {property.possessionDate || "—"}</p>
                  <p className="text-sm font-bold mt-1 text-green-700">
                    ₹{property.price}{" "}
                    <span className="text-xs text-gray-500">(All Inc)</span>
                  </p>
                </div>

                <div className="mt-4">
                  <Link href={`/listing/${property.id}`}>
                    <Button variant="default" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      📅 Book Tour
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
