import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

export default async function SellerPaymentsPage() {
  const { userId } = await auth();

  if (!userId) {
    return notFound(); // or redirect("/login") if you want to push to login
  }

  const payments = await prisma.payment.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Payments</h1>

      {payments.length === 0 ? (
        <p className="text-gray-500">You haven't made any payments yet.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3 border">Amount</th>
                <th className="px-4 py-3 border">Status</th>
                <th className="px-4 py-3 border">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {payments.map((payment) => (
                <tr key={payment.id} className="border-t">
                  <td className="px-4 py-3 border font-medium">₹{payment.amount}</td>
                  <td className="px-4 py-3 border">
                    <Badge
                      variant={
                        payment.status === "succeeded"
                          ? "default"
                          : payment.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 border">
                    {format(new Date(payment.createdAt), "dd MMM yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
