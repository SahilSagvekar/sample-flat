"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function CloudinaryUpload({
  onUpload,
  resourceType = "auto", // "image" or "video"
  folder = "sampleflat",
}: {
  onUpload: (url: string) => void;
  resourceType?: "image" | "video" | "auto";
  folder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_upload"); // 🔁 Replace this
    formData.append("folder", folder);

    const endpoint = `https://api.cloudinary.com/v1_1/deyxbg1hf/${resourceType}/upload`; // 🔁 Replace this

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.secure_url) {
      onUpload(data.secure_url);
    } else {
      alert("Upload failed.");
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
        onChange={handleUpload}
        className="text-sm"
      />
    </>
  );
}
