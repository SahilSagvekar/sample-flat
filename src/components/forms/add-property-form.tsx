"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CloudinaryUpload } from "@/components/cloudinary/CloudinaryUpload";

export function AddPropertyForm({ userId }: { userId: string }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    bhk: "",
    possessionDate: "",
    amenities: "",
    city: "",
    state: "",
    locality: "",
    sampleFlatVideo: "",
    localityVideo: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        images,
        sellerId: userId,
      }),
    });

    if (res.ok) {
      router.push("/dashboard/seller");
    } else {
      alert("Failed to create property.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="title" placeholder="Title" onChange={handleChange} required />
      <Input name="price" placeholder="Price" onChange={handleChange} required />
      <Input name="bhk" placeholder="BHK" onChange={handleChange} required />
      <Input name="possessionDate" placeholder="Possession Date" onChange={handleChange} />
      <Input name="amenities" placeholder="Amenities (comma-separated)" onChange={handleChange} />
      <Input name="city" placeholder="City" onChange={handleChange} />
      <Input name="state" placeholder="State" onChange={handleChange} />
      <Input name="locality" placeholder="Locality" onChange={handleChange} />
      <Input name="sampleFlatVideo" placeholder="Sample Flat Video URL" onChange={handleChange} />
      <Input name="localityVideo" placeholder="Locality Video URL" onChange={handleChange} />

      {/* ✅ Cloudinary Upload */}
      <div className="space-y-2">
        <label className="font-medium text-sm">Upload Property Images</label>
        <CloudinaryUpload
          onUpload={(url) => setImages((prev) => [...prev, url])}
        />

        {/* ✅ Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {images.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Preview"
                className="h-24 w-full object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>

      <Button type="submit" className="w-full">Submit Property</Button>
    </form>
  );
}
