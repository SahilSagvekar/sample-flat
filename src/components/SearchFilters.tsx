"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (location) query.set("location", location);
    if (minPrice) query.set("minPrice", minPrice);
    if (maxPrice) query.set("maxPrice", maxPrice);
    if (propertyType) query.set("propertyType", propertyType);
    if (bedrooms) query.set("bedrooms", bedrooms);

    router.push(`/properties?${query.toString()}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gray-100 rounded-lg">
      <Input
        placeholder="Search location or title"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        placeholder="Min Price"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <Input
        placeholder="Max Price"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <select
        className="border rounded p-2"
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
      >
        <option value="">Type</option>
        <option value="Apartment">Apartment</option>
        <option value="Villa">Villa</option>
        <option value="Studio">Studio</option>
      </select>
      <select
        className="border rounded p-2"
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
      >
        <option value="">Bedrooms</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
      </select>
      <Button onClick={handleSearch} className="col-span-full md:col-span-1">
        Apply Filters
      </Button>
    </div>
  );
}
