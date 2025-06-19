import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/shared/property-card";
import SearchForm from "@/components/forms/search-form";

export default async function ListingPage({ searchParams }: { searchParams: any }) {
  const filters: any = {};

  if (searchParams.city) filters.city = { contains: searchParams.city, mode: "insensitive" };
  if (searchParams.state) filters.state = { contains: searchParams.state, mode: "insensitive" };
  if (searchParams.bhk) filters.bhk = searchParams.bhk;

  const properties = await prisma.property.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

      <SearchForm defaultValues={searchParams} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
