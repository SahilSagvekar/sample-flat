import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export default async function SellerPaymentsPage() {
  const { userId } = await auth();
  const payments = await prisma.payment.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Payments</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
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
