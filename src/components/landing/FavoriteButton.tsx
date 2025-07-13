"use client";

import { useEffect, useState } from "react";
import { Heart, X } from "lucide-react";
import toast from "react-hot-toast";

interface FavoriteButtonProps {
  propertyId: string;
}

export default function FavoriteButton({ propertyId }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch("/api/buyer/favourite");
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          const exists = data.some((fav) => fav.propertyId === propertyId);
          setIsFavorited(exists);
        }
      } catch (err) {
        console.error("Error checking favorite:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkFavorite();
  }, [propertyId]);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/buyer/favourite", {
        method: isFavorited ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId }),
      });

      if (res.ok) {
        setIsFavorited(!isFavorited);
        toast.success(
          isFavorited ? "Removed from favorites!" : "Added to favorites!"
        );
      } else {
        const data = await res.json();
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm shadow-sm border transition ${
        isFavorited
          ? "bg-red-100 text-red-600 border-red-300 hover:bg-red-200"
          : "bg-[#2BBBC1]/10 text-[#2BBBC1] border-[#2BBBC1]/30 hover:bg-[#2BBBC1]/20"
      }`}
    >
      {isFavorited ? <X size={16} /> : <Heart size={16} />}
      {isFavorited ? "Remove" : "Favorite"}
    </button>
  );
}
