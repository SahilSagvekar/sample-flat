"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CloudinaryUpload } from "@/components/cloudinary/CloudinaryUpload";

export function AddPropertyForm({ userId, property }: { userId: string, property?: any }) {
  const [form, setForm] = useState({
    title: property?.title || "",
    price: property?.price?.toString() || "",
    bhk: property?.bhk || "",
    possessionDate: property?.possessionDate || "",
    amenities: property?.amenities?.join(", ") || "",
    city: property?.city || "",
    state: property?.state || "",
    locality: property?.locality || "",
    sampleFlatVideo: property?.sampleFlatVideo || "",
    localityVideo: property?.localityVideo || "",
  });

  const [imageUrls, setImageUrls] = useState<string[]>(property?.imageUrls || []);
  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(property ? `/api/properties/${property.id}` : "/api/properties", {
      method: property ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        imageUrls,
        sellerId: userId,
      }),
    });

    if (res.ok) {
      router.push("/dashboard/seller");
    } else {
      alert("Failed to save property.");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 🏠 Property Info */}
      <Input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <Input
        name="price"
        placeholder="Price"
        onChange={handleChange}
        required
      />
      <Input name="bhk" placeholder="BHK" onChange={handleChange} required />
      <Input
        name="possessionDate"
        placeholder="Possession Date"
        onChange={handleChange}
      />
      <Input
        name="amenities"
        placeholder="Amenities (comma-separated)"
        onChange={handleChange}
      />
      <Input name="city" placeholder="City" onChange={handleChange} />
      <Input name="state" placeholder="State" onChange={handleChange} />
      <Input name="locality" placeholder="Locality" onChange={handleChange} />

      {/* 🖼️ Image Upload */}
      <div className="space-y-2">
        <label className="font-medium text-sm">Upload Property Images</label>
        <CloudinaryUpload
          onUpload={(url) => setImageUrls((prev) => [...prev, url])}
        />
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {imageUrls.map((url, i) => (
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

      {/* 📹 Sample Flat Video */}
      <div className="space-y-2">
        <label className="font-medium text-sm">Upload Sample Flat Video</label>
        <CloudinaryUpload
          onUpload={(url) => setForm({ ...form, sampleFlatVideo: url })}
        />
        {form.sampleFlatVideo && (
          <video controls className="rounded mt-2 w-full">
            <source src={form.sampleFlatVideo} />
          </video>
        )}
      </div>

      {/* 📹 Locality Video */}
      <div className="space-y-2">
        <label className="font-medium text-sm">Upload Locality Video</label>
        <CloudinaryUpload
          onUpload={(url) => setForm({ ...form, localityVideo: url })}
        />
        {form.localityVideo && (
          <video controls className="rounded mt-2 w-full">
            <source src={form.localityVideo} />
          </video>
        )}
      </div>

      {/* ✅ Submit */}
      <Button type="submit" className="w-full">
        Submit Property
      </Button>
    </form>
  );
}
