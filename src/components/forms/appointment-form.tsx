// "use client";

// import { useState } from "react";

// export default function AppointmentForm({
//   propertyId,
//   sellerId,
// }: {
//   propertyId: string;
//   sellerId: string;
// }) {
//   const [date, setDate] = useState("");
//   const [type, setType] = useState("site-visit");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);

//     const res = await fetch("/api/appointments", {
//       method: "POST",
//       body: JSON.stringify({ propertyId, sellerId, date, type }),
//     });

//     setLoading(false);
//     if (res.ok) {
//       alert("✅ Appointment booked!");
//     } else {
//       alert("❌ Failed. Try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//       <label className="block">
//         Appointment Date:
//         <input
//           type="datetime-local"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//           className="input w-full"
//         />
//       </label>

//       <label className="block">
//         Type:
//         <select
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="input w-full"
//         >
//           <option value="site-visit">Site Visit</option>
//           <option value="video-call">Video Call</option>
//         </select>
//       </label>

//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-green-600 text-white px-4 py-2 rounded"
//       >
//         {loading ? "Booking..." : "Book Appointment"}
//       </button>
//     </form>
//   );
// }





"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

export function AppointmentForm({
  propertyId,
  sellerId,
}: {
  propertyId: string;
  sellerId: string;
}) {
  const [date, setDate] = useState("");
  const [type, setType] = useState("site");
  const router = useRouter();

  const handleSubmit = async (e:any) => {
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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-md mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold text-gray-800">Book an Appointment</h2>

      <div className="space-y-1">
        <label htmlFor="appointment-date" className="text-sm font-medium text-gray-700">
          Select Date & Time
        </label>
        <Input
          id="appointment-date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="appointment-type" className="text-sm font-medium text-gray-700">
          Appointment Type
        </label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger id="appointment-type" className="w-full">
            {type === "site" ? "Site Visit" : "Video Call"}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="site">Site Visit</SelectItem>
            <SelectItem value="video">Video Call</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full bg-gray-900">
        Submit Appointment
      </Button>
    </form>
  );
}
