"use client";

import { useState } from "react";

export default function SellerSettingsPage() {
  const [calendlyLink, setCalendlyLink] = useState("");

  const handleSave = async () => {
    await fetch("/api/seller/updateCalendly", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ calendlyLink }),
    });

    alert("Link saved!");
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <label className="block font-medium mb-1">Your Calendly Link (Zoom integrated)</label>
      <input
        type="text"
        placeholder="https://calendly.com/yourname/15min"
        value={calendlyLink}
        onChange={(e) => setCalendlyLink(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
      />
      <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
}
