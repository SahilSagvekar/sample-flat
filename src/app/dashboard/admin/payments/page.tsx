import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import Link from "next/link";

export default async function AdminPaymentsPage() {
  const { userId } = await auth();

  // Optional: Protect with your Clerk admin ID
  // if (userId !== "your_admin_clerk_user_id") redirect("/");

  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Payments</h1>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">User ID</th>
            <th className="border px-4 py-2 text-left">Amount</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="border px-4 py-2">{payment.userId}</td>
              <td className="border px-4 py-2">₹{payment.amount}</td>
              <td className="border px-4 py-2">{payment.status}</td>
              <td className="border px-4 py-2">{format(new Date(payment.createdAt), "dd MMM yyyy")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
