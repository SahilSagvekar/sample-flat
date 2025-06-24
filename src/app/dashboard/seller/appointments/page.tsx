import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export default async function SellerAppointmentsPage() {
  const { userId } = await auth();
  if (!userId) return <div>Unauthorized</div>;

  const appointments = await prisma.appointment.findMany({
    where: { sellerId: userId },
    include: {
      property: {
        select: { title: true },
      },
    },
    orderBy: { date: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments yet.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Property</th>
              <th className="border px-4 py-2">Buyer</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td className="border px-4 py-2">{appt.property.title}</td>
                <td className="border px-4 py-2">{appt.buyerId}</td>
                <td className="border px-4 py-2">
                  {format(new Date(appt.date), "dd MMM yyyy, hh:mm a")}
                </td>
                <td className="border px-4 py-2 capitalize">{appt.type}</td>
                <td className="border px-4 py-2 capitalize">{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
