"use client";

import { BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  property: {
    id: string;
    title: string;
    bhk: string;
    price: number;
    city: string;
    state: string;
    status: string;
    sellerId?: string;
    featured?: boolean;
    imageUrls?: string[];
  };
  currentUserId?: string;
  className?: string;
};

export default function PropertyCard({ property }: Props) {
     const firstImageUrl = property.imageUrls?.[0] || "";
  const getOptimizedImageUrl = (url: string) =>
    url.includes("res.cloudinary.com")
      ? url.replace("/upload/", "/upload/w_600,h_400,c_fill/")
      : url;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition max-w-sm">
      {/* Image */}
      <div className="relative w-full h-56 rounded-t-2xl overflow-hidden">
           <Image
                      src={getOptimizedImageUrl(firstImageUrl)}
                      alt={property.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={false}
                    />

        {/* For Rent Badge */}
        {/* <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md font-medium shadow">
          For Rent
        </span> */}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {property.city}, {property.state}
        </p>

        {/* Amenities */}
        <div className="flex justify-between text-sm text-gray-700 mt-2">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            {property.bhk} Beds
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {property.baths} Bathrooms
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="w-4 h-4" />
            {property.size} sq ft
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3">
          <Link href={`/listing/${property.id}`}>
            <Button className="text-sm font-semibold rounded-md px-4 py-2 bg-black text-white hover:bg-gray-800">
              View Details
            </Button>
          </Link>
          <span className="text-lg font-bold text-gray-900">
            ₹{property.price.toLocaleString()}
            <span className="text-sm font-normal text-gray-500">/month</span>
          </span>
        </div>
      </div>
    </div>
  );
}
