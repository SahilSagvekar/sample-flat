"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";

export function AppointmentForm({ propertyId, sellerId }: { propertyId: string; sellerId: string }) {
  const [date, setDate] = useState("");
  const [type, setType] = useState("site");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId, sellerId, type, date }),
    });

    if (res.ok) {
      alert("Appointment requested!");
      router.refresh();
    } else {
      alert("Failed to schedule.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
      <Select value={type} onValueChange={setType}>
        <SelectTrigger>Choose appointment type</SelectTrigger>
        <SelectContent>
          <SelectItem value="site">Site Visit</SelectItem>
          <SelectItem value="video">Video Call</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Submit</Button>
    </form>
  );
}
