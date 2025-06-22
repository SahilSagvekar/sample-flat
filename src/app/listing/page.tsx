import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/shared/property-card";
import SearchForm from "@/components/forms/search-form";
import MapWrapper from "@/components/map/MapWrapper"; // ✅ Map client wrapper

export default async function ListingPage({ searchParams }: { searchParams: any }) {
  const filters: any = {};

  if (searchParams.city)
    filters.city = { contains: searchParams.city, mode: "insensitive" };

  if (searchParams.state)
    filters.state = { contains: searchParams.state, mode: "insensitive" };

  if (searchParams.bhk) filters.bhk = searchParams.bhk;

  if (searchParams.minPrice || searchParams.maxPrice) {
    filters.price = {
      ...(searchParams.minPrice && { gte: parseFloat(searchParams.minPrice) }),
      ...(searchParams.maxPrice && { lte: parseFloat(searchParams.maxPrice) }),
    };
  }

  if (searchParams.possessionDate)
    filters.possessionDate = {
      contains: searchParams.possessionDate,
      mode: "insensitive",
    };

  const properties = await prisma.property.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

      <SearchForm defaultValues={searchParams} />

      {properties.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          <MapWrapper properties={properties} /> {/* 🗺️ Map Column */}

          <div className="lg:col-span-3 space-y-4"> {/* 🏠 Listings */}
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
