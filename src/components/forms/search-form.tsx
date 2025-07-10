"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

type SearchParams = {
  city?: string;
  bhk?: string;
  minPrice?: string;
  maxPrice?: string;
};

type Props = {
  defaultValues?: SearchParams;
};

export default function SearchForm({ defaultValues = {} }: Props) {
  const router = useRouter();

  const [query, setQuery] = useState<SearchParams>({
    city: defaultValues.city || "",
    bhk: defaultValues.bhk || "",
    minPrice: defaultValues.minPrice || "",
    maxPrice: defaultValues.maxPrice || "",
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

    router.push(`/listing?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Input name="city" placeholder="City" value={query.city} onChange={handleChange} />
      <Input name="bhk" placeholder="BHK" value={query.bhk} onChange={handleChange} />
      <Input name="minPrice" placeholder="Min Price" value={query.minPrice} onChange={handleChange} />
      <Input name="maxPrice" placeholder="Max Price" value={query.maxPrice} onChange={handleChange} />
      <Button type="submit" className="col-span-2 md:col-span-1">Search</Button>
    </form>
  );
}
