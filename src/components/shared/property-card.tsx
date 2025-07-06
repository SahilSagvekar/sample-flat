"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Home, Star, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

export default function PropertyCard({
  property,
  currentUserId,
  className = "",
}: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFeaturing, setIsFeaturing] = useState(false);

  const firstImageUrl = property.imageUrls?.[0] || "";
  const getOptimizedImageUrl = (url: string) =>
    url.includes("res.cloudinary.com")
      ? url.replace("/upload/", "/upload/w_600,h_400,c_fill/")
      : url;

  useEffect(() => {
    if (currentUserId) {
      fetch("/api/favorites")
        .then((res) => res.json())
        .then((favorites) => {
          const exists = favorites.some(
            (fav: any) => fav.propertyId === property.id
          );
          setIsFavorite(exists);
        });
    }
  }, [currentUserId, property.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUserId) return alert("Please sign in to save properties.");

    try {
      const method = isFavorite ? "DELETE" : "POST";
      const body = isFavorite ? undefined : JSON.stringify({ propertyId: property.id });
      const res = await fetch(`/api/favorites${isFavorite ? `/${property.id}` : ""}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Favorite toggle failed:", error);
    }
  };

  const handleFeatureListing = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFeaturing(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: property.id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      alert("Failed to feature listing");
    } finally {
      setIsFeaturing(false);
    }
  };

  return (
    <div
      className={`bg-white border rounded-2xl overflow-hidden shadow hover:shadow-md transition ${className}`}
    >
      {/* Image */}
      <div className="relative w-full h-56">
        <Link href={`/listing/${property.id}`}>
          {firstImageUrl ? (
            <Image
              src={getOptimizedImageUrl(firstImageUrl)}
              alt={property.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Home className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </Link>

        {/* Favorite & Badge */}
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          {property.featured && (
            <Badge className="bg-orange-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {currentUserId && (
            <Button
              onClick={toggleFavorite}
              variant="ghost"
              size="icon"
              className="bg-white/90 backdrop-blur rounded-full"
              aria-label="Favorite"
            >
              {isFavorite ? (
                <Heart className="text-red-500 fill-red-500" />
              ) : (
                <Heart className="text-gray-400 hover:text-red-500" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold line-clamp-2">{property.title}</h3>

        <div className="text-sm text-gray-600 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {property.city}, {property.state}
        </div>

        <div className="flex gap-4 text-sm mt-1 text-gray-700">
          <div className="flex items-center gap-1">
            <Home className="w-4 h-4" />
            {property.bhk} BHK
          </div>
          <div className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4" />
            {property.price.toLocaleString()}/month
          </div>
        </div>

        <Badge
          variant={property.status === "approved" ? "default" : "secondary"}
          className="mt-1"
        >
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </Badge>

        <div className="pt-3 flex flex-col gap-2">
          <Link href={`/listing/${property.id}`}>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>

          <Button
            variant={property.featured ? "secondary" : "default"}
            className="w-full"
            onClick={handleFeatureListing}
            disabled={property.featured || isFeaturing}
          >
            {property.featured ? (
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                Featured Listing
              </span>
            ) : isFeaturing ? (
              "Processing..."
            ) : (
              "Feature This Listing"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
