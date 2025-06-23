"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";

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
    sampleFlatVideo?: string;
    localityVideo?: string;
  };
  currentUserId?: string;
};

export default function PropertyCard({ property, currentUserId }: Props) {
  const isOwner = currentUserId && property.sellerId === currentUserId;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!currentUserId) return;
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((favorites) => {
        const exists = favorites.find((fav: any) => fav.propertyId === property.id);
        setIsFavorite(!!exists);
      });
  }, [currentUserId, property.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUserId) return alert("Please sign in to save properties.");

    if (isFavorite) {
      await fetch(`/api/favorites/${property.id}`, { method: "DELETE" });
      setIsFavorite(false);
    } else {
      await fetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify({ propertyId: property.id }),
      });
      setIsFavorite(true);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const confirmed = confirm("Are you sure you want to delete this listing?");
    if (!confirmed) return;

    const res = await fetch(`/api/properties/${property.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="hover:shadow-lg transition rounded-xl border overflow-hidden relative">
      {/* 💖 Save Button */}
      {currentUserId && (
        <Button
          onClick={toggleFavorite}
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10"
        >
          {isFavorite ? <HeartOff className="text-red-500" /> : <Heart />}
        </Button>
      )}

      <Link href={`/listing/${property.id}`} className="block">
        <Card className="h-full">
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-sm text-gray-600">
              {property.bhk} BHK – ₹{property.price}
            </p>
            <p className="text-sm">📍 {property.city}, {property.state}</p>
            <p className={`text-xs font-medium ${
              property.status === "approved" ? "text-green-600" : "text-yellow-600"
            }`}>
              Status: {property.status}
            </p>

            {property.sampleFlatVideo && (
              <video controls width="100%" className="rounded mt-2">
                <source src={property.sampleFlatVideo} />
              </video>
            )}

            {property.localityVideo && (
              <video controls width="100%" className="rounded mt-2">
                <source src={property.localityVideo} />
              </video>
            )}
          </CardContent>
        </Card>
      </Link>

      {/* ✏️ Edit/Delete for Owner */}
      {isOwner && (
        <div className="p-4 pt-0 flex gap-2">
          <Link href={`/dashboard/seller/edit/${property.id}`} className="w-1/2">
            <Button variant="outline" className="w-full">Edit</Button>
          </Link>
          <Button variant="destructive" className="w-1/2" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}

      {/* 💳 Feature Button */}
      <Button
        variant="default"
        className="w-full"
        onClick={async (e) => {
          e.preventDefault();
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
        }}
      >
        Feature This Listing
      </Button>
      <Button
  variant="secondary"
  className="w-full"
  onClick={async (e) => {
    e.preventDefault();

    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId: property.id }),
    });

    const data = await res.json();
    alert(data.message); // "Added to favorites" or "Removed from favorites"
  }}
>
  💖 Save Listing
</Button>

    </div>
  );
}
