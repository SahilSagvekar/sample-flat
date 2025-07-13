"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useUserRoleFromDB";
import { SiteVisitForm } from "@/components/SiteVisitForm";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Star, Bed, Bath, Calendar, User, Check,
  TreePalm, Ruler, LayoutGrid, Layers, BadgeCheck, Phone,
} from "lucide-react";
import ShareUrlButton from "@/components/landing/ShareUrlButton";
import FavoriteButton from "@/components/landing/FavoriteButton";
import { CalendlyModal } from "@/components/CalendlyModal";
import MediaSliderModal from "@/components/MediaSliderModal";
import { Button } from "@/components/ui/button";

export default function PropertyPageClient({ property }: { property: any }) {
  const currentUser = useCurrentUser();
  const [sellerEmail, setSellerEmail] = useState("");
  const [showSlider, setShowSlider] = useState(false);

  const mediaItems = [
    ...(property.imageUrls?.map((url: string) => ({ type: "image", url })) || []),
    ...(property.sampleFlatVideo ? [{ type: "video", url: property.sampleFlatVideo }] : []),
    ...(property.localityVideo ? [{ type: "video", url: property.localityVideo }] : []),
  ];

  useEffect(() => {
    const fetchSellerEmail = async () => {
      if (!property?.sellerId) return;
      try {
        const res = await fetch(`/api/user/${property.sellerId}`);
        const data = await res.json();
        setSellerEmail(data.email || "");
      } catch (err) {
        console.error("Error fetching seller email:", err);
      }
    };
    fetchSellerEmail();
  }, [property?.sellerId]);

  return (
    <div className="bg-white text-gray-800">
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Media Header */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <img src={mediaItems[0]?.url} alt="Main" className="md:col-span-2 w-full h-64 sm:h-96 object-cover rounded-xl" />
          <div className="flex flex-col gap-2">
            {mediaItems.slice(1, 3).map((item, i) =>
              item.type === "image" ? (
                <img key={i} src={item.url} className="h-28 sm:h-32 w-full object-cover rounded-md" />
              ) : (
                <video key={i} src={item.url} controls className="h-28 sm:h-32 w-full object-cover rounded-md" />
              )
            )}
            {mediaItems.length > 3 && (
              <button
                className="bg-[#2BBBC1] text-white py-2 text-sm rounded-md"
                onClick={() => setShowSlider(true)}
              >
                View all media
              </button>
            )}
          </div>
        </div>

        {/* Title & Actions */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <div className="flex items-center text-sm text-gray-600 gap-2 mt-1">
            <MapPin className="w-4 h-4" />
            {property.locality}, {property.city}, {property.state}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <ShareUrlButton />
            <FavoriteButton propertyId={property.id} />
            {property.featured && (
              <Badge className="bg-yellow-400 text-black flex items-center">
                <Star className="w-4 h-4 mr-1" /> Featured
              </Badge>
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          <Feature icon={<Bed />} label="Bedrooms" value={property.bedrooms} />
          <Feature icon={<Bath />} label="Bathrooms" value={property.bathroom} />
          <Feature icon={<TreePalm />} label="Balconies" value={property.balconies} />
          <Feature icon={<Ruler />} label="Carpet Area" value={property.carpetArea} />
          <Feature icon={<LayoutGrid />} label="Builtup Area" value={property.builtupArea} />
          <Feature icon={<Layers />} label="Super Builtup Area" value={property.superBuiltupArea} />
          <Feature icon={<BadgeCheck />} label="Ownership" value={property.ownershipStatus} />
          <Feature icon={<BadgeCheck />} label="Status" value={property.status} />
          <Feature icon={<Calendar />} label="Posted" value={new Date(property.createdAt).toLocaleDateString()} />
          <Feature icon={<User />} label="Seller" value={property.seller?.name} />
          <Feature icon={<Calendar />} label="Possession" value={property.possessionDate} />
        </div>

        {/* Description */}
        {property.description && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#2BBBC1] mb-2">About this property</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </section>
        )}

        {/* Amenities */}
        {property.amenities?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#2BBBC1] mb-2">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {property.amenities.map((a: string, i: number) => (
                <div key={i} className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" /> {a.trim()}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bookings */}
        <section className="space-y-4 mt-8">
          {property.seller?.calendlyLink && (
            <CalendlyModal url={property.seller.calendlyLink} />
          )}
          {currentUser && sellerEmail && (
            <SiteVisitForm buyerEmail={currentUser.email} sellerEmail={sellerEmail} />
          )}
          <Button
            onClick={() => {
              navigator.clipboard.writeText(property.seller?.phone);
              alert("Seller phone number copied to clipboard.");
            }}
          >
            📞 Copy Seller Number
          </Button>
        </section>

        {showSlider && (
          <MediaSliderModal media={mediaItems} onClose={() => setShowSlider(false)} />
        )}
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
    <div className="flex items-center gap-3 p-4 bg-gray-50 border rounded-lg shadow-sm">
      <div className="text-[#2BBBC1]">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value ?? "N/A"}</p>
      </div>
    </div>
  );
}
