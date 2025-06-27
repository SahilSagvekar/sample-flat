"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Home, Star, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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

export default function PropertyCard({ property, currentUserId, className }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFeaturing, setIsFeaturing] = useState(false);

  // Get optimized image URL with Cloudinary transformations
  const getOptimizedImageUrl = (url: string) => {
    if (!url.includes('res.cloudinary.com')) return url;
    return url.replace('/upload/', '/upload/w_400,h_300,c_fill/');
  };

  const firstImageUrl = property.imageUrls?.[0] ? 
    getOptimizedImageUrl(property.imageUrls[0]) : '';

  useEffect(() => {
    // Fetch favorite status if user is logged in
    if (currentUserId) {
      fetch("/api/favorites")
        .then((res) => res.json())
        .then((favorites) => {
          const exists = favorites.some((fav: any) => fav.propertyId === property.id);
          setIsFavorite(exists);
        });
    }
  }, [currentUserId, property.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUserId) return alert("Please sign in to save properties.");

    try {
      if (isFavorite) {
        await fetch(`/api/favorites/${property.id}`, { method: "DELETE" });
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ propertyId: property.id }),
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to update favorite:", error);
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
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create Stripe session");
      }
    } catch (error) {
      console.error("Error featuring listing:", error);
      alert("An error occurred while processing your request");
    } finally {
      setIsFeaturing(false);
    }
  };

  return (
    <div 
      className={`hover:shadow-lg transition-all duration-300 rounded-xl border overflow-hidden relative bg-white dark:bg-gray-900 flex ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image Section - Fixed aspect ratio */}
      <div className="w-1/3 relative aspect-[4/3] min-w-[200px]">
        <Link href={`/listing/${property.id}`} className="block h-full w-full">
          {firstImageUrl ? (
            <Image
              src={firstImageUrl}
              alt={`${property.title} - ${property.bhk} BHK in ${property.city}`}
              fill
              className="object-cover transition-transform duration-300"
              style={{
                transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                objectPosition: 'center'
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="bg-gray-200 h-full w-full flex items-center justify-center">
              <Home className="w-10 h-10 text-gray-400" />
            </div>
          )}
        </Link>
        
        {/* Favorite Button */}
        {currentUserId && (
          <Button
            onClick={toggleFavorite}
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 z-10 rounded-full bg-white/90 backdrop-blur-sm transition-opacity ${
              isHovering ? 'opacity-100' : 'opacity-80'
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <Heart className="text-red-500 fill-red-500" />
            ) : (
              <Heart className="text-gray-400 hover:text-red-500" />
            )}
          </Button>
        )}

        {/* Featured Badge */}
        {property.featured && (
          <Badge className="absolute top-2 left-2 z-10 bg-yellow-400 hover:bg-yellow-400 text-black">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <div className="w-2/3 p-4 flex flex-col">
        <div className="flex-1">
          <h2 className="text-lg font-semibold line-clamp-2">{property.title}</h2>
          
          <div className="flex items-center gap-2 text-sm mt-2">
            <Home className="w-4 h-4 text-gray-500" />
            <span>{property.bhk} BHK</span>
            <span className="text-gray-300">•</span>
            <IndianRupee className="w-4 h-4 text-gray-500" />
            <span>{property.price.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <MapPin className="w-4 h-4" />
            <span>
              {property.city}, {property.state}
            </span>
          </div>

          <Badge
            variant={property.status === "approved" ? "default" : "secondary"}
            className="mt-2"
          >
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
          <div className="flex gap-2">
            <Link href={`/listing/${property.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
            
            {currentUserId && property.sellerId !== currentUserId && (
              <Button
                variant="secondary"
                className="flex-1"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await fetch("/api/favorites", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ propertyId: property.id }),
                  });
                  const data = await res.json();
                  alert(data.message);
                }}
              >
                {isFavorite ? "Saved" : "Save Property"}
              </Button>
            )}
          </div>
          
          {/* Feature This Listing Button - Always visible but conditionally styled */}
          <Button
            variant={property.featured ? "secondary" : "default"}
            className="w-full"
            onClick={handleFeatureListing}
            disabled={isFeaturing || property.featured}
          >
            {property.featured ? (
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
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