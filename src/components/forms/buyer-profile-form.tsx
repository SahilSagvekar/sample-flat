"use client";

import { useState } from "react";

export function BuyerProfileForm({ initialData }) {
  const [bio, setBio] = useState(initialData?.bio || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [phone, setPhone] = useState(initialData?.phone || "");

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/profile/buyer", {
      method: "POST",
      body: JSON.stringify({ bio, location, phone }),
    });
    alert("Saved!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      <button type="submit">Save</button>
    </form>
  );
}
