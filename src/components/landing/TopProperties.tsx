import { prisma } from "@/lib/prisma";
import Link from "next/link";
import PropertyImage from "@/components/PropertyImage";

export default async function TopProperties() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
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
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading & CTA */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Properties listings
            </h2>
            <p className="text-gray-500 mt-1">
              View our carefully curated selection of the best homes on the
              market today.
            </p>
          </div>
          <Link
            href="/listing"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-medium transition"
          >
            See All Listing →
          </Link>
        </div>

        {/* Category Tabs (Static UI) */}
        <div className="flex space-x-6 mb-8 border-b">
          {["Houses", "Apartments", "Condos", "Townhouses"].map((type) => (
            <button
              key={type}
              className="text-gray-700 pb-2 border-b-2 border-transparent hover:border-orange-500 hover:text-orange-600 transition font-medium"
            >
              {type}
            </button>
          ))}
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {properties.map((property) => {
            const areaDisplay =
              property.area && typeof property.area === "number"
                ? `${property.area} sq ft`
                : property.locality || "—";

            return (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden">
                  <PropertyImage
                    src={property.imageUrls?.[0] || "/fallback.jpg"}
                    alt={property.title}
                  />
                  <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    For Rent
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      📍 {property.city?.toLowerCase() || "city"},{" "}
                      {property.state?.toLowerCase() || "India"}
                    </p>

                    <div className="flex items-center text-gray-600 text-sm mt-3 gap-4 flex-wrap">
                      <span>🛏 {property.bhk || 1} Beds</span>
                      <span>🛁 {property.bathrooms || 1} Baths</span>
                      <span>📐 {areaDisplay}</span>
                    </div>
                  </div>

                  {/* CTA + Price */}
                  <div className="mt-5 flex justify-between items-center">
                    <Link
                      href={`/listing/${property.id}`}
                      className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-900"
                    >
                      View Details
                    </Link>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ₹{property.price?.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-gray-500">/month</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
