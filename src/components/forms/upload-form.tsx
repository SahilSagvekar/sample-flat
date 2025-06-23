"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UploadForm({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    onUploaded(data.secure_url);
    setLoading(false);
  };

  return (
    <div className="space-y-2">
      <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}
