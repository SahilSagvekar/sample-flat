"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  resourceType?: "image" | "video" | "auto";
  folder?: string;
  label?: string;
  fileType?: string;
}

export function CloudinaryUpload({
  onUpload,
  resourceType = "auto",
  folder = "sampleflat",
  label = "Upload",
  fileType = resourceType === "video" ? "video/*" : "image/*",
}: CloudinaryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

 const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_upload"); // must exist in Cloudinary
  formData.append("folder", folder);

  const endpoint = `https://api.cloudinary.com/v1_1/deyxbg1hf/${resourceType}/upload`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error?.message || "Upload failed");
    }

    if (data.secure_url) {
      onUpload(data.secure_url);
    } else {
      alert("Upload failed.");
      console.error(data);
    }
  } catch (err) {
    console.error("Upload error:", err);
    alert("Cloudinary upload failed. See console for details.");
  }

  if (inputRef.current) {
    inputRef.current.value = "";
  }
};


  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept={fileType}
        onChange={handleUpload}
        className="text-sm"
      />
    </div>
  );
}
