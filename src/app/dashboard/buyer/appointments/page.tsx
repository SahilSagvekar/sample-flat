import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function BuyerAppointmentsPage() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const appointments = await prisma.appointment.findMany({
    where: { buyerId: user.id },
    include: {
      property: true,
    },
    orderBy: { date: "asc" },
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Appointments</h1>

      {appointments.length === 0 ? (
        <p>You haven’t booked any appointments yet.</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="border rounded p-4">
              <p><strong>Property:</strong> {appt.property.title}</p>
              <p><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</p>
              <p><strong>Type:</strong> {appt.type === "site" ? "Site Visit" : "Video Call"}</p>
              <p><strong>Status:</strong> {appt.status}</p>
              <p className="text-sm text-gray-500">📍 {appt.property.city}, {appt.property.state}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
