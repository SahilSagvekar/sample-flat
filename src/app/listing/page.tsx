import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/shared/property-card";
import SearchForm from "@/components/forms/search-form";
import MapClientWrapper from "@/components/map/MapClientWrapper";

type SearchParams = {
  city?: string;
  state?: string;
  bhk?: string;
  minPrice?: string;
  maxPrice?: string;
  possessionDate?: string;
};

export default async function ListingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
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

  if (searchParams.possessionDate) {
    filters.possessionDate = {
      contains: searchParams.possessionDate,
      mode: "insensitive",
    };
  }

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
      status: true,
      sellerId: true,
      sampleFlatVideo: true,
      localityVideo: true,
      featured: true,
    },
    orderBy: [
  { featured: "desc" },     // ✅ Show featured first
  { createdAt: "desc" },    // Then newest first
],

  });

  properties = properties.map((property) => ({
    ...property,
    latitude: property.latitude ?? 19.0760 + Math.random() * 0.05,
    longitude: property.longitude ?? 72.8777 + Math.random() * 0.05,
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

      <SearchForm defaultValues={searchParams} />

      {properties.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          <MapClientWrapper properties={properties} />

          <div className="lg:col-span-3 space-y-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
