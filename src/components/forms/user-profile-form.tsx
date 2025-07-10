"use client";

import { useState } from "react";

type Props = {
  user: {
    name: string | null;
    role: string;
    phone?: string;
    location?: string;
    bio?: string;
    company?: string;
    website?: string;
    about?: string;
  };
};

export function UserProfileForm({ user }: Props) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    location: user.location || "",
    bio: user.bio || "",
    company: user.company || "",
    website: user.website || "",
    about: user.about || "",
  });

  const isSeller = user.role === "SELLER";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert("Profile updated!");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="input" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="input" />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="input" />
      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Short bio" className="input" />

      {isSeller && (
        <>
          <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="input" />
          <input name="website" value={formData.website} onChange={handleChange} placeholder="Website" className="input" />
          <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About your services" className="input" />
        </>
      )}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
