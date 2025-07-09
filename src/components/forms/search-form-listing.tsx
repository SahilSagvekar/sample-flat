"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState({
    city: searchParams.get("city") || "",
    bhk: searchParams.get("bhk") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const handleChange = (e: any) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (query.city) params.set("city", query.city);
    if (query.bhk) params.set("bhk", query.bhk);
    if (query.minPrice) params.set("minPrice", query.minPrice);
    if (query.maxPrice) params.set("maxPrice", query.maxPrice);

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
          <Label>BHK</Label>
          <Select
            value={query.bhk}
            onValueChange={(val) => setQuery({ ...query, bhk: val })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select BHK" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((val) => (
                <SelectItem key={val} value={val.toString()}>
                  {val} BHK
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

        <div className="text-center text-sm text-gray-500 mt-2">
          Advanced Filter
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r bg-[#2BBBC1]  text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition"
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
            });
            router.push("/listing"); // Clears the filters from URL
          }}
        >
          🧹 Clear Filters
        </Button>
      </form>
    </Card>
  );
}
