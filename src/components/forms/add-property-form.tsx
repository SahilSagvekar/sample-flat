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
    houseNo: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    carpetArea: "",
    builtupArea: "",
    superBuiltupArea: "",
    ownershipStatus: "",
    availabilityStatus: "",
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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow"
    >
      <Input
        name="title"
        placeholder="Apartment / Society Name"
        onChange={handleChange}
        required
      />
      <Input
        name="houseNo"
        placeholder="House No"
        onChange={handleChange}
        required
      />
      <Input name="city" placeholder="City" onChange={handleChange} required />
      <Input
        name="state"
        placeholder="State"
        onChange={handleChange}
        required
      />
      <Input
        name="locality"
        placeholder="Locality"
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            No of Bedrooms
          </label>
          <select
            name="bedrooms"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            No of Bathrooms
          </label>
          <select
            name="bathrooms"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            No of Balconies
          </label>
          <select
            name="balconies"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        name="carpetArea"
        placeholder="Carpet Area (sq.ft)"
        onChange={handleChange}
      />
      <Input
        name="builtupArea"
        placeholder="Built-up Area (sq.ft)"
        onChange={handleChange}
      />
      <Input
        name="superBuiltupArea"
        placeholder="Super Built-up Area (sq.ft)"
        onChange={handleChange}
      />

      <label className="block text-sm font-medium text-gray-700">
        Ownership Status
      </label>
      <select
        name="ownershipStatus"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Select</option>
        {[
          "Freehold",
          "Leasehold",
          "Co-operative society",
          "Power of Attorney",
        ].map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label className="block text-sm font-medium text-gray-700">
        Availability Status
      </label>
      <select
        name="availabilityStatus"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Select</option>
        {["Ready To Move", "Under Construction"].map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <Input
        name="price"
        placeholder="Price"
        onChange={handleChange}
        required
      />
      <Input name="bhk" placeholder="BHK" onChange={handleChange} required />
      <Input
        name="possessionDate"
        placeholder="Possession Date (e.g. 2025-12)"
        onChange={handleChange}
      />
      <Input
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <Input
        name="amenities"
        placeholder="Amenities (comma-separated)"
        onChange={handleChange}
      />

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Property Images
          </h3>
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

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Sample Flat Video
          </h3>
          <div className="border-dashed border-2 border-gray-300 hover:bg-gray-50 transition p-4 rounded-md">
            <CloudinaryUpload
              onUpload={(url) => setForm({ ...form, sampleFlatVideo: url })}
              label="Upload Sample Flat Video"
              fileType="video/*"
            />
          </div>
          {form.sampleFlatVideo && (
            <video controls className="mt-3 w-full rounded-lg border shadow">
              <source src={form.sampleFlatVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Locality Video
          </h3>
          <div className="border-dashed border-2 border-gray-300 hover:bg-gray-50 transition p-4 rounded-md">
            <CloudinaryUpload
              onUpload={(url) => setForm({ ...form, localityVideo: url })}
              label="Upload Locality Video"
              fileType="video/*"
            />
          </div>
          {form.localityVideo && (
            <video controls className="mt-3 w-full rounded-lg border shadow">
              <source src={form.localityVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Submit Property
      </Button>
    </form>
  );
}
