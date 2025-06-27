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
    description: "",
    amenities: "",
    city: "",
    state: "",
    locality: "",
    sampleFlatVideo: "",
    localityVideo: "",
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
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
        imageUrls,
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
      {/* 🏠 Property Info */}
      <Input name="title" placeholder="Title" onChange={handleChange} required />
      <Input name="price" placeholder="Price" onChange={handleChange} required />
      <Input name="bhk" placeholder="BHK" onChange={handleChange} required />
      <Input name="possessionDate" placeholder="Possession Date" onChange={handleChange} />
      <Input name="description" placeholder="Description" onChange={handleChange} />
      <Input name="amenities" placeholder="Amenities (comma-separated)" onChange={handleChange} />
      <Input name="city" placeholder="City" onChange={handleChange} />
      <Input name="state" placeholder="State" onChange={handleChange} />
      <Input name="locality" placeholder="Locality" onChange={handleChange} />

     <div className="space-y-6">
  {/* 🖼️ Property Images Upload */}
  <div className="space-y-2">
    <h3 className="text-lg font-semibold text-gray-800">Property Images</h3>
    <label className="text-sm font-medium text-gray-600">Upload Property Images</label>
    <div className="border-dashed border-2 border-gray-300 hover:bg-gray-50 transition p-4 rounded-md">
      <CloudinaryUpload
        onUpload={(url) => setImageUrls((prev) => [...prev, url])}
        label="Upload Images"
        fileType="image/*"
      />
    </div>
    {imageUrls.length > 0 && (
      <div className="grid grid-cols-2 gap-3 mt-3">
        {imageUrls.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`Image ${i + 1}`}
            className="h-32 w-full object-cover rounded-lg border"
          />
        ))}
      </div>
    )}
  </div>

  {/* 📹 Sample Flat Video */}
  <div className="space-y-2">
    <h3 className="text-lg font-semibold text-gray-800">Sample Flat Video</h3>
    <label className="text-sm font-medium text-gray-600">Upload Sample Flat Video</label>
    <div className="border-dashed border-2 border-gray-300 hover:bg-gray-50 transition p-4 rounded-md">
      <CloudinaryUpload
        onUpload={(url) => setForm({ ...form, sampleFlatVideo: url })}
        label="Upload Video"
        fileType="video/*"
      />
    </div>
    {form.sampleFlatVideo && (
      <video
        controls
        className="mt-3 w-full rounded-lg border shadow"
      >
        <source src={form.sampleFlatVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )}
  </div>

  {/* 📍 Locality Video */}
  <div className="space-y-2">
    <h3 className="text-lg font-semibold text-gray-800">Locality Video</h3>
    <label className="text-sm font-medium text-gray-600">Upload Locality Video</label>
    <div className="border-dashed border-2 border-gray-300 hover:bg-gray-50 transition p-4 rounded-md">
      <CloudinaryUpload
        onUpload={(url) => setForm({ ...form, localityVideo: url })}
        label="Upload Video"
        fileType="video/*"
      />
    </div>
    {form.localityVideo && (
      <video
        controls
        className="mt-3 w-full rounded-lg border shadow"
      >
        <source src={form.localityVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )}
  </div>
</div>



      {/* ✅ Submit */}
      <Button type="submit" className="w-full">
        Submit Property
      </Button>
    </form>
  );
}
