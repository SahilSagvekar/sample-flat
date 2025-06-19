"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

export function CloudinaryUpload({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  useEffect(() => {
    if (!window.cloudinary) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "deyxbg1hf", // 🔁 Replace with yours
        uploadPreset: "unsigned_upload", // 🔁 Replace with your unsigned preset
        sources: ["local", "url", "camera"],
        multiple: false,
        maxFileSize: 5000000, // 5MB
        resourceType: "image",
        cropping: false,
      },
      (error: any, result: any) => {
        if (!error && result.event === "success") {
          console.log("📸 Uploaded:", result.info.secure_url);
          onUpload(result.info.secure_url);
        }
      }
    );

    const btn = document.getElementById("cloudinary-upload-btn");
    if (btn) {
      btn.addEventListener("click", () => widget.open(), false);
    }
  }, [onUpload]);

  return (
    <button
      type="button"
      id="cloudinary-upload-btn"
      className="bg-blue-600 text-white px-4 py-2 rounded w-full"
    >
      Upload Image
    </button>
  );
}
