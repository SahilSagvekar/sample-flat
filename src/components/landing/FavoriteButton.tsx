

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

  const handleAdd = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/buyer/favourite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId }),
      });

      if (res.ok) {
        toast.success("Added to favorites!");
        setIsFavorited(true);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to add favorite");
      }
    } catch (err) {
      toast.error("Error adding to favorites");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/buyer/favourite", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId }),
      });

      if (res.ok) {
        toast.success("Removed from favorites!");
        setIsFavorited(false);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to remove favorite");
      }
    } catch (err) {
      toast.error("Error removing from favorites");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <button className="px-4 py-2 border rounded-lg text-gray-500 bg-gray-100" disabled>
        Loading...
      </button>
    );
  }

  return isFavorited ? (
    <button
      onClick={handleRemove}
      className="flex items-center gap-1 px-4 py-2 border rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
    >
      <X className="w-4 h-4" />
      Remove Favorite
    </button>
  ) : (
    <button
      onClick={handleAdd}
      className="flex items-center gap-1 px-4 py-2 border rounded-lg bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
    >
      <Heart className="w-4 h-4" />
      Add to Favorites
    </button>
  );
}
