"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm({ defaultValues }: { defaultValues: any }) {
  const router = useRouter();

  const [city, setCity] = useState(defaultValues.city || "");
  const [state, setState] = useState(defaultValues.state || "");
  const [bhk, setBhk] = useState(defaultValues.bhk || "");
  const [minPrice, setMinPrice] = useState(defaultValues.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(defaultValues.maxPrice || "");
  const [possessionDate, setPossessionDate] = useState(defaultValues.possessionDate || "");

  const handleSearch = (e: any) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (city) params.set("city", city);
    if (state) params.set("state", state);
    if (bhk) params.set("bhk", bhk);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (possessionDate) params.set("possessionDate", possessionDate);

    router.push(`/listing?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input"
      />
      <input
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="input"
      />
      <select value={bhk} onChange={(e) => setBhk(e.target.value)} className="input">
        <option value="">All BHK</option>
        <option value="1BHK">1BHK</option>
        <option value="2BHK">2BHK</option>
        <option value="3BHK">3BHK</option>
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="input"
      />
      <select
        value={possessionDate}
        onChange={(e) => setPossessionDate(e.target.value)}
        className="input"
      >
        <option value="">Possession</option>
        <option value="Ready to Move">Ready to Move</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
}
