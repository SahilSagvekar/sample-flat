"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MapPin,
  Star,
  IndianRupee,
  Bath,
  Ruler,
  Bed,
  Home,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

type Props = {
  property: {
    id: string;
    title: string | null;
    bhk: string | null;
    price: number | null;
    city: string | null;
    state: string | null;
    status: string | null;
    sellerId?: string | null;
    featured?: boolean | null;
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
      const body = isFavorite
        ? undefined
        : JSON.stringify({ propertyId: property.id });
      const res = await fetch(
        `/api/favorites${isFavorite ? `/${property.id}` : ""}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body,
        }
      );
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
    <div className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition ${className}`}>
      {/* Image Section */}
      <div className="relative w-full h-56 rounded-t-2xl overflow-hidden">
        <Link href={`/listing/${property.id}`}>
          {firstImageUrl ? (
            <Image
              src={getOptimizedImageUrl(firstImageUrl)}
              alt={property.title ?? "Property image"}
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

        {/* Status Badge */}
        {property.status === "approved" && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-[#2BBBC1] text-white text-xs px-2 py-1 rounded-md shadow-sm">
              For Rent
            </Badge>
          </div>
        )}

        {/* Favorite & Featured */}
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          {property.featured && (
            <Badge className="bg-yellow-400 text-black text-xs font-medium">
              <Star className="w-3 h-3 mr-1 fill-yellow-400" />
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

      {/* Content Section */}
      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold capitalize truncate">
          {property.title}
        </h3>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {property.city}, {property.state}
        </p>

        {/* Amenities + Price */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" /> {property.bhk} BHK
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" /> 2 Baths
            </div>
            <div className="flex items-center gap-1">
              <Ruler className="w-4 h-4" /> 1200 sqft
            </div>
          </div>

          <div className="font-bold text-lg text-gray-900 whitespace-nowrap">
            ₹{property.price.toLocaleString()}
            <span className="text-sm font-medium text-gray-500">/month</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 space-y-2">
          <Link href={`/listing/${property.id}`}>
            <Button className="w-full rounded-lg bg-black text-white hover:bg-gray-800 transition">
              View Details
            </Button>
          </Link>

          {!property.featured && (
            <Button
              onClick={handleFeatureListing}
              disabled={isFeaturing}
              className="w-full bg-gradient-to-r from-[#2BBBC1] to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition"
            >
              {isFeaturing ? "Processing..." : "Feature This Listing"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
   















// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Heart, MapPin, Home, Star, IndianRupee } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import Link from "next/link";

// type Props = {
//   property: {
//     id: string;
//     title: string;
//     bhk: string;
//     price: number;
//     city: string;
//     state: string;
//     status: string;
//     sellerId?: string;
//     featured?: boolean;
//     imageUrls?: string[];
//   };
//   currentUserId?: string;
//   className?: string;
// };

// export default function PropertyCard({
//   property,
//   currentUserId,
//   className = "",
// }: Props) {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isFeaturing, setIsFeaturing] = useState(false);

//   const firstImageUrl = property.imageUrls?.[0] || "";
//   const getOptimizedImageUrl = (url: string) =>
//     url.includes("res.cloudinary.com")
//       ? url.replace("/upload/", "/upload/w_600,h_400,c_fill/")
//       : url;

//   useEffect(() => {
//     if (currentUserId) {
//       fetch("/api/favorites")
//         .then((res) => res.json())
//         .then((favorites) => {
//           const exists = favorites.some(
//             (fav: any) => fav.propertyId === property.id
//           );
//           setIsFavorite(exists);
//         });
//     }
//   }, [currentUserId, property.id]);

//   const toggleFavorite = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (!currentUserId) return alert("Please sign in to save properties.");

//     try {
//       const method = isFavorite ? "DELETE" : "POST";
//       const body = isFavorite ? undefined : JSON.stringify({ propertyId: property.id });
//       const res = await fetch(`/api/favorites${isFavorite ? `/${property.id}` : ""}`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body,
//       });
//       setIsFavorite(!isFavorite);
//     } catch (error) {
//       console.error("Favorite toggle failed:", error);
//     }
//   };

//   const handleFeatureListing = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsFeaturing(true);
//     try {
//       const res = await fetch("/api/stripe/checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ propertyId: property.id }),
//       });
//       const data = await res.json();
//       if (data.url) window.location.href = data.url;
//     } catch (err) {
//       alert("Failed to feature listing");
//     } finally {
//       setIsFeaturing(false);
//     }
//   };

//   return (
//     <div
//       className={`bg-white border rounded-2xl overflow-hidden shadow hover:shadow-md transition ${className}`}
//     >
//       {/* Image */}
//       <div className="relative w-full h-56">
//         <Link href={`/listing/${property.id}`}>
//           {firstImageUrl ? (
//             <Image
//               src={getOptimizedImageUrl(firstImageUrl)}
//               alt={property.title}
//               fill
//               className="object-cover"
//               sizes="100vw"
//               priority={false}
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//               <Home className="w-8 h-8 text-gray-400" />
//             </div>
//           )}
//         </Link>

//         {/* Favorite & Badge */}
//         <div className="absolute top-2 right-2 z-10 flex gap-2">
//           {property.featured && (
//             <Badge className="bg-[#2BBBC1] text-white">
//               <Star className="w-3 h-3 mr-1" />
//               Featured
//             </Badge>
//           )}
//           {currentUserId && (
//             <Button
//               onClick={toggleFavorite}
//               variant="ghost"
//               size="icon"
//               className="bg-white/90 backdrop-blur rounded-full"
//               aria-label="Favorite"
//             >
//               {isFavorite ? (
//                 <Heart className="text-red-500 fill-red-500" />
//               ) : (
//                 <Heart className="text-gray-400 hover:text-red-500" />
//               )}
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-4 space-y-2">
//         <h3 className="text-lg font-semibold line-clamp-2">{property.title}</h3>

//         <div className="text-sm text-gray-600 flex items-center gap-2">
//           <MapPin className="w-4 h-4" />
//           {property.city}, {property.state}
//         </div>

//         <div className="flex gap-4 text-sm mt-1 text-gray-700">
//           <div className="flex items-center gap-1">
//             <Home className="w-4 h-4" />
//             {property.bhk} BHK
//           </div>
//           <div className="flex items-center gap-1">
//             <IndianRupee className="w-4 h-4" />
//             {property.price.toLocaleString()}/month
//           </div>
//         </div>

//         <Badge
//           variant={property.status === "approved" ? "default" : "secondary"}
//           className="mt-1"
//         >
//           {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
//         </Badge>

//         <div className="pt-3 flex flex-col gap-2">
//           <Link href={`/listing/${property.id}`}>
//             <Button variant="outline" className="w-full">
//               View Details
//             </Button>
//           </Link>

//           <Button
//             variant={property.featured ? "secondary" : "default"}
//            className="w-full bg-gradient-to-r from-[#2BBBC1] to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition"
//             onClick={handleFeatureListing}
//             disabled={property.featured || isFeaturing}
//           >
//             {property.featured ? (
//               <span className="flex items-center">
//                 <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
//                 Featured Listing
//               </span>
//             ) : isFeaturing ? (
//               "Processing..."
//             ) : (
//               "Feature This Listing"
//             )}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
