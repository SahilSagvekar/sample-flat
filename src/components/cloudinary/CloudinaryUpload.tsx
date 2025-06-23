"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function CloudinaryUpload({
  onUpload,
  folder = "sampleflat",
  resourceType = "auto", // auto = image or video
}: {
  onUpload: (url: string) => void;
  folder?: string;
  resourceType?: "image" | "video" | "auto";
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_upload"); // ⬅️ Replace with your unsigned preset name  
    formData.append("folder", folder);

    const res = await fetch(`https://api.cloudinary.com/v1_1/deyxbg1hf/${resourceType}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.secure_url) {
      onUpload(data.secure_url);
    } else {
      alert("Upload failed");
      console.error(data);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={resourceType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        className="text-sm"
      />
    </>
  );
}
