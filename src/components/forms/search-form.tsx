"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchForm({ defaultValues }: { defaultValues?: any }) {
  const router = useRouter();
  const params = useSearchParams();

  const [form, setForm] = useState({
    city: defaultValues?.city || "",
    state: defaultValues?.state || "",
    bhk: defaultValues?.bhk || "",
    minPrice: defaultValues?.minPrice || "",
    maxPrice: defaultValues?.maxPrice || "",
    possessionDate: defaultValues?.possessionDate || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });

    router.push(`/listing?${query.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <Input placeholder="City" name="city" value={form.city} onChange={handleChange} />
      <Input placeholder="State" name="state" value={form.state} onChange={handleChange} />
      <select name="bhk" value={form.bhk} onChange={handleChange} className="border rounded-md p-2">
        <option value="">BHK</option>
        <option value="1">1 BHK</option>
        <option value="2">2 BHK</option>
        <option value="3">3 BHK</option>
        <option value="4">4+ BHK</option>
      </select>
      <Input type="number" placeholder="Min Price" name="minPrice" value={form.minPrice} onChange={handleChange} />
      <Input type="number" placeholder="Max Price" name="maxPrice" value={form.maxPrice} onChange={handleChange} />
      <Input type="month" name="possessionDate" value={form.possessionDate} onChange={handleChange} />
      <Button type="submit" className="col-span-2 md:col-span-1">Search</Button>
    </form>
  );
}
