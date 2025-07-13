// components/SiteVisitForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SiteVisitForm({ buyerEmail, sellerEmail }: { buyerEmail: string; sellerEmail: string }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments/site-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyerEmail, sellerEmail, date, time }),
      });

      console.log("Response:", res);
      if (res.ok) {
        setSuccess(true);
      } else {
        alert("Something went wrong.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
      <Button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Booking..." : "Book Site Visit"}
      </Button>
      {success && <p className="text-green-600">✅ Site visit booked and emails sent!</p>}
    </div>
  );
}
