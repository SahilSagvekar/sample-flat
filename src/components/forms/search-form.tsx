"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm({ defaultValues }: { defaultValues: any }) {
  const router = useRouter();
  const [city, setCity] = useState(defaultValues.city || "");
  const [state, setState] = useState(defaultValues.state || "");
  const [bhk, setBhk] = useState(defaultValues.bhk || "");

  const handleSearch = (e: any) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (city) params.set("city", city);
    if (state) params.set("state", state);
    if (bhk) params.set("bhk", bhk);

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

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
}
