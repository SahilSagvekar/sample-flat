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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Appointments</h1>

      {appointments.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          You haven’t booked any appointments yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="rounded-2xl shadow-md border border-gray-200 p-6 bg-white transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-gray-800">
                  {appt.property.title}
                </h2>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    appt.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {appt.status}
                </span>
              </div>

              <div className="space-y-1 text-gray-700">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appt.date).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {appt.type === "site" ? "Site Visit" : "Video Call"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  📍 {appt.property.city}, {appt.property.state}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
