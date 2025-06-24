import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminAppointmentsPage() {
  // const user = await currentUser();
  // if (!user) redirect("/sign-in");

  // const dbUser = await prisma.user.findUnique({
  //   where: { clerkId: user.id },
  // });

  // if (dbUser?.role !== "admin") redirect("/");

  const appointments = await prisma.appointment.findMany({
    include: {
      property: true,
    },
    orderBy: { date: "asc" },
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">All Appointments (Admin)</h1>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="border rounded p-4 space-y-1">
              <p><strong>Property:</strong> {appt.property.title}</p>
              <p><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</p>
              <p><strong>Type:</strong> {appt.type}</p>
              <p><strong>Status:</strong> {appt.status}</p>
              <p className="text-sm text-gray-600">
                👤 Buyer: {appt.buyerId} | 🏗 Seller: {appt.sellerId}
              </p>
              <p className="text-sm text-gray-500">📍 {appt.property.city}, {appt.property.state}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
