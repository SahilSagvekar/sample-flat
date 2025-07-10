import { prisma } from "@/lib/prisma";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Home,
  Star,
  IndianRupee,
  BadgeCheck,
  Calendar,
  User,
  Check,
  Bed,
  Bath,
  Ruler,
  Wrench,
} from "lucide-react";
import PropertyMediaGallery from "@/components/shared/property-media-gallery";
import { CalendlyModal } from "@/components/CalendlyModal";

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: { seller: true },
  });

  if (!property) return notFound();

  const mediaItems = [
    ...(property.imageUrls?.map((url) => ({ type: "image" as const, url })) ||
      []),
    ...(property.sampleFlatVideo
      ? [
          {
            type: "video" as const,
            url: property.sampleFlatVideo,
            title: "Sample Flat",
          },
        ]
      : []),
    ...(property.localityVideo
      ? [
          {
            type: "video" as const,
            url: property.localityVideo,
            title: "Locality",
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT COLUMN */}
          <div className="lg:w-2/3 space-y-8">
            {/* Media Gallery */}
            <div className="grid grid-cols-3 gap-4">
              <img
                src={mediaItems[0]?.url}
                alt="Main property"
                className="col-span-2 h-80 w-full object-cover rounded-xl shadow"
              />
              <div className="flex flex-col gap-2">
                {mediaItems.slice(1, 3).map((item, i) => (
                  <img
                    key={i}
                    src={item.url}
                    alt={`Gallery ${i}`}
                    className="h-39 w-full object-cover rounded-xl shadow"
                  />
                ))}
                {mediaItems.length > 3 && (
                  <button className="bg-black/60 text-white text-sm p-2 rounded-xl hover:bg-black">
                    View all photos
                  </button>
                )}
              </div>
            </div>

            {/* Title + Location */}
            <div className="bg-white rounded-xl shadow p-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>
                  {property.locality}, {property.city}, {property.state}
                </span>
              </div>
              {property.featured && (
                <Badge className="mt-2 bg-yellow-400 text-black inline-flex items-center">
                  <Star className="w-3 h-3 mr-1" /> Featured
                </Badge>
              )}
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Feature icon={<Bed />} label="Bedrooms" value={property.bhk ?? "N/A"} />

              <Feature
                icon={<Bath />}
                label="Bathrooms"
                value={property.bathrooms ?? "N/A"}
              />
              <Feature
                icon={<Ruler />}
                label="Area"
                value={`${property.area ?? "N/A"} sqft`}
              />
              <Feature
                icon={<Wrench />}
                label="Repair Quality"
                value={property.quality || "Standard"}
              />
              <Feature
                icon={<IndianRupee />}
                label="Price"
                value={`₹${property.price.toLocaleString()}`}
              />
              <Feature
                icon={<BadgeCheck />}
                label="Status"
                value={property.status ?? "N/A"}
              />
              <Feature
                icon={<Calendar />}
                label="Posted"
                value={new Date(property.createdAt).toLocaleDateString()}
              />
              <Feature
                icon={<User />}
                label="Seller"
                value={property.seller?.name || "Not available"}
              />
            </div>

            {/* About Section */}
            {property.description && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">About this home</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            )}

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((a, i) => (
                    <div key={i} className="flex items-center text-gray-700">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {a.trim()}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book Visit */}
            {/* <div className="mt-10 bg-blue-50 rounded-xl shadow-sm border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-blue-700 text-center mb-4">
                Book a Visit
              </h2>
              <AppointmentForm propertyId={property.id} sellerId={property.sellerId} />
            </div> */}

            {property?.seller?.calendlyLink && (
              <CalendlyModal url={property.seller.calendlyLink} />
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Rent price
                </h3>
                <p className="text-2xl font-bold text-orange-600">
                  ₹{property.price.toLocaleString()}/month
                </p>
                <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium">
                  Apply now
                </button>
              </div>

              {/* Tour Buttons */}
              <div className="bg-white rounded-xl shadow p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Request a home tour
                </h4>
                <div className="space-y-2">
                  <button className="w-full border border-gray-300 px-4 py-2 rounded-md">
                    In Person
                  </button>
                  <button className="w-full border border-gray-300 px-4 py-2 rounded-md">
                    Virtual
                  </button>
                  <button className="w-full bg-orange-100 text-orange-700 py-2 rounded-md">
                    Request a tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Feature({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="text-[#2BBBC1]">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const properties = await prisma.property.findMany({
    select: { id: true },
  });

  return properties.map((property) => ({
    id: property.id.toString(),
  }));
}
