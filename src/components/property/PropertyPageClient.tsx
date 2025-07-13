"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Bed, Bath, Calendar, User, Check, BadgeCheck } from "lucide-react";
import ShareUrlButton from "@/components/landing/ShareUrlButton";
import FavoriteButton from "@/components/landing/FavoriteButton";
import { CalendlyModal } from "@/components/CalendlyModal";
import MediaSliderModal from "@/components/MediaSliderModal";

export default function PropertyPageClient({ property }: { property: any }) {
  const [showSlider, setShowSlider] = useState(false);

  const mediaItems = [
    ...(property.imageUrls?.map((url: string) => ({ type: "image", url })) || []),
    ...(property.sampleFlatVideo ? [{ type: "video", url: property.sampleFlatVideo }] : []),
    ...(property.localityVideo ? [{ type: "video", url: property.localityVideo }] : []),
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Media Section */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <img
            src={mediaItems[0]?.url}
            alt="Property main"
            className="md:col-span-2 w-full h-64 sm:h-80 object-cover rounded-xl shadow"
          />
          <div className="flex flex-col gap-2">
            {mediaItems.slice(1, 3).map((item, i) =>
              item.type === "image" ? (
                <img
                  key={i}
                  src={item.url}
                  alt={`Media ${i}`}
                  className="h-32 w-full object-cover rounded-xl shadow"
                />
              ) : (
                <video
                  key={i}
                  src={item.url}
                  controls
                  className="h-32 w-full object-cover rounded-xl shadow"
                />
              )
            )}
            {mediaItems.length > 3 && (
              <button
                className="bg-[#2BBBC1] text-white py-2 text-sm rounded-xl"
                onClick={() => setShowSlider(true)}
              >
                View all media
              </button>
            )}
          </div>
        </div>

        {/* Title & Actions */}
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {property.locality}, {property.city}, {property.state}
            </span>
            <ShareUrlButton />
            <FavoriteButton propertyId={property.id} />
          </div>
          {property.featured && (
            <Badge className="bg-yellow-400 text-black inline-flex items-center w-fit">
              <Star className="w-4 h-4 mr-1" /> Featured
            </Badge>
          )}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          <Feature icon={<Bed />} label="Bedrooms" value={property.bhk ?? "N/A"} />
          <Feature icon={<Bath />} label="Bathrooms" value={property.bathroom ?? "N/A"} />
          <Feature icon={<BadgeCheck />} label="Status" value={property.status ?? "N/A"} />
          <Feature icon={<Calendar />} label="Posted" value={new Date(property.createdAt).toLocaleDateString()} />
          <Feature icon={<User />} label="Seller" value={property.seller?.name || "N/A"} />
        </div>

        {/* Description */}
        {property.description && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2 text-[#2BBBC1]">About this property</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
          </section>
        )}

        {/* Amenities */}
        {property.amenities?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2 text-[#2BBBC1]">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {property.amenities.map((a: string, i: number) => (
                <div key={i} className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" /> {a.trim()}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Booking */}
        {property.seller?.calendlyLink && (
          <div className="mt-8">
            <CalendlyModal url={property.seller.calendlyLink} />
          </div>
        )}

        {/* Media Modal */}
        {showSlider && (
          <MediaSliderModal media={mediaItems} onClose={() => setShowSlider(false)} />
        )}
      </main>
    </div>
  );
}

function Feature({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-2 p-3 border rounded-lg bg-white shadow-sm">
      <div className="text-[#2BBBC1]">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}
