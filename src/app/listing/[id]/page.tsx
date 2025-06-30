// app/listing/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { AppointmentForm } from "@/components/forms/appointment-form";
import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/ui/footer";
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
} from "lucide-react";
import PropertyMediaGallery from "@/components/shared/property-media-gallery";
import { CallSellerButton } from "@/components/call/CallSellerButton";

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await prisma.property.findUnique({
    where: {
      id: params.id,
    },
    include: {
      seller: true,
    },
  });

  if (!property) return notFound();

  // Prepare media items for the gallery
  const mediaItems = [
    ...(property.imageUrls?.map((url) => ({ type: "image", url })) || []),
    ...(property.sampleFlatVideo
      ? [{ type: "video", url: property.sampleFlatVideo, title: "Sample Flat" }]
      : []),
    ...(property.localityVideo
      ? [{ type: "video", url: property.localityVideo, title: "Locality" }]
      : []),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* Main Content Section */}
        <div className="flex flex-col gap-8 mb-8">
          {/* Top Section - Media and Details */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Media Gallery */}
            <div className="lg:w-2/3">
              <PropertyMediaGallery mediaItems={mediaItems} />
            </div>

            {/* Right Column - Property Details */}
            <div className="lg:w-1/3 space-y-6">
              {/* Title and Location */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {property.title}
                </h1>
                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>
                    {property.locality}, {property.city}, {property.state}
                  </span>
                </div>

                {property.featured && (
                  <Badge className="mt-2 bg-yellow-400 hover:bg-yellow-400 text-black">
                    <Star className="w-3 h-3 mr-1" />
                    Featured Property
                  </Badge>
                )}
              </div>

              {/* Key Details Card */}
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/30">
                <h2 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-200">
                  Property Highlights
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center">
                    <IndianRupee className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-300" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Price
                      </p>
                      <p className="font-medium">
                        ₹{property.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Home className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-300" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        BHK
                      </p>
                      <p className="font-medium">{property.bhk}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <BadgeCheck className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-300" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Status
                      </p>
                      <p className="font-medium capitalize">
                        {property.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-300" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Posted
                      </p>
                      <p className="font-medium">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-300" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Seller
                      </p>
                      <p className="font-medium">
                        {property.seller?.name || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          {property.amenities?.length > 0 && (
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl shadow-sm border border-green-100 dark:border-green-900/30">
              <h2 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-200">
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {amenity.trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full-width Book a Visit Section */}
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900/30">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-200 text-center">
              Book a Visit
            </h2>
            <div className="max-w-2xl mx-auto">
              <AppointmentForm
                propertyId={property.id}
                sellerId={property.sellerId}
              />
            </div>
          </div>

          {/* CallSellerButton */}
          {property.sellerId && (
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                Talk to Seller
              </h3>
              <CallSellerButton sellerId={property.sellerId} />
            </div>
          )}
        </div>
      </main>
      <Footer className="mt-12" />
    </div>
  );
}
