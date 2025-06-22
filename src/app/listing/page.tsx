import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/shared/property-card";
import SearchForm from "@/components/forms/search-form";
import MapClientWrapper from "@/components/map/MapClientWrapper";


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

  // 🧠 Fetch properties with selected fields
  let properties = await prisma.property.findMany({
    where: filters,
    select: {
      id: true,
      title: true,
      price: true,
      city: true,
      state: true,
      bhk: true,
      latitude: true,
      longitude: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // 🧪 Inject static coordinates if missing (for testing)
  properties = properties.map((property) => ({
    ...property,
    latitude: property.latitude ?? 19.0760 + Math.random() * 0.05,   // Near Mumbai
    longitude: property.longitude ?? 72.8777 + Math.random() * 0.05,
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

      <SearchForm defaultValues={searchParams} />

      {properties.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          <MapClientWrapper properties={properties} />{/* Map Column */}

          <div className="lg:col-span-3 space-y-4"> {/* Listings */}
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
