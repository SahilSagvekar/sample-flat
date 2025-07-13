"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState({
    city: searchParams.get("city") || "",
    bhk: searchParams.get("bhk") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    possessionFrom: searchParams.get("possessionFrom") || "",
    possessionTo: searchParams.get("possessionTo") || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (query.city) params.set("city", query.city);
    if (query.bhk) params.set("bhk", query.bhk);
    if (query.minPrice) params.set("minPrice", query.minPrice);
    if (query.maxPrice) params.set("maxPrice", query.maxPrice);
    if (query.possessionFrom) params.set("possessionFrom", query.possessionFrom);
    if (query.possessionTo) params.set("possessionTo", query.possessionTo);

    router.push(`/listing?${params.toString()}`);
  };

  return (
    <Card className="max-w-sm w-full p-6 rounded-2xl shadow-md bg-white space-y-4">
      <h3 className="text-lg font-semibold">Find Property</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="city">Location</Label>
          <Input
            name="city"
            placeholder="Enter your location..."
            value={query.city}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="bhk">BHK</Label>
          <Input
            name="bhk"
            placeholder="1, 2, 3..."
            value={query.bhk}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            name="minPrice"
            placeholder="₹ Min"
            value={query.minPrice}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            name="maxPrice"
            placeholder="₹ Max"
            value={query.maxPrice}
            onChange={handleChange}
          />
        </div>

        {/* ✅ Possession Date From */}
        <div className="space-y-1">
          <Label htmlFor="possessionFrom">Possession From</Label>
          <Input
            type="date"
            name="possessionFrom"
            value={query.possessionFrom}
            onChange={handleChange}
          />
        </div>

        {/* ✅ Possession Date To */}
        <div className="space-y-1">
          <Label htmlFor="possessionTo">Possession To</Label>
          <Input
            type="date"
            name="possessionTo"
            value={query.possessionTo}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#2BBBC1] hover:bg-orange-600 text-white font-semibold rounded-lg transition"
        >
          🔍 Search
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full mt-2"
          onClick={() => {
            setQuery({
              city: "",
              bhk: "",
              minPrice: "",
              maxPrice: "",
              possessionFrom: "",
              possessionTo: "",
            });
            router.push("/listing");
          }}
        >
          🧹 Clear Filters
        </Button>
      </form>
    </Card>
  );
}
