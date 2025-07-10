import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/shared/PropertyCard-2";
import SearchForm from "@/components/forms/search-form-listing";
import MapClientWrapper from "@/components/map/MapClientWrapper";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type SearchParams = {
  city?: string;
  state?: string;
  bhk?: string;
  minPrice?: string;
  maxPrice?: string;
  possessionDate?: string;
  page?: string;
};

const ITEMS_PER_PAGE = 6;

export default async function ListingPage(
  props: {
    searchParams: Promise<SearchParams>;
  }
) {
  const searchParams = await props.searchParams;
  const currentPage = Math.max(1, parseInt(searchParams.page || "1"));
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

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

  const [totalProperties, properties] = await Promise.all([
    prisma.property.count({ where: filters }),
    prisma.property.findMany({
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
        featured: true,
        imageUrls: true,
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: ITEMS_PER_PAGE,
      skip,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalProperties / ITEMS_PER_PAGE));
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages && properties.length === ITEMS_PER_PAGE;

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && typeof value !== "symbol") {
        params.set(key, String(value));
      }
    });

    params.set("page", Math.max(1, Math.min(page, totalPages)).toString());
    return `?${params.toString()}`;
  };

  const processedProperties = properties.map((property) => ({
    ...property,
    latitude: property.latitude ?? '',
    longitude: property.longitude ?? '',
  }));

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <div className="p-6 flex-1 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-2">🏘 Available Properties</h1>
        <p className="text-gray-600 mb-6">Find your perfect home from verified listings</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside>
           <SearchForm /> 
            {/* <Button className="w-full mt-4 bg-[#2BBBC1] hover:bg-orange-600 text-white">View All Listings</Button> */}
          </aside>

          <main className="lg:col-span-3 space-y-6">
            {processedProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {processedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      // className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2 mt-6">
                  {hasPreviousPage && (
                    <Link href={getPageUrl(currentPage - 1)} className="px-4 py-2 rounded border hover:bg-gray-100">
                      ←
                    </Link>
                  )}

                  {[...Array(totalPages)].map((_, i) => (
                    <Link
                      key={i}
                      href={getPageUrl(i + 1)}
                      className={`px-4 py-2 rounded text-sm font-medium ${currentPage === i + 1 ? "bg-[#2BBBC1] text-white" : "border hover:bg-gray-100"}`}
                    >
                      {i + 1}
                    </Link>
                  ))}

                  {hasNextPage && (
                    <Link href={getPageUrl(currentPage + 1)} className="px-4 py-2 rounded border hover:bg-gray-100">
                      →
                    </Link>
                  )}
                </div>

                <div className="mt-10 w-full h-[400px] rounded-xl overflow-hidden shadow">
                  <MapClientWrapper properties={processedProperties} />
                </div>
              </>
            ) : (
              <div className="mt-16 text-center text-gray-500">
                <p className="text-lg">No properties found matching your filters.</p>
                <Link
                  href={getPageUrl(1)}
                  className="mt-4 inline-block text-blue-600 hover:underline"
                >
                  Reset Filters
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
