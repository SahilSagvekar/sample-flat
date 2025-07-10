import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import PropertyCard from "@/components/shared/property-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const { userId } = await auth();

  // Replace with your admin ID if needed
  // if (userId !== "user_admin123") redirect("/");

  // const properties = await prisma.property.findMany({
  //   include: {
  //     seller: true,
  //   },
  //   orderBy: { createdAt: "desc" },
  // });

  const users = await prisma.user.findMany({
    include: {
      properties: true, // get how many properties they listed
    },
  });

  const [properties, stats] = await Promise.all([
    prisma.property.findMany({
      include: { seller: true },
      orderBy: { createdAt: "desc" },
    }),
    getStats(),
  ]);

  // ✅ Stats Helper
  async function getStats() {
    const [totalUsers, totalListings, approvedListings, pendingListings] =
      await Promise.all([
        prisma.user.count(),
        prisma.property.count(),
        prisma.property.count({ where: { status: "approved" } }),
        prisma.property.count({ where: { status: "pending" } }),
      ]);

    return { totalUsers, totalListings, approvedListings, pendingListings };
  }

  // ✅ StatCard Component
  function StatCard({ label, value }: { label: string; value: number }) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-4 text-center">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard: Listings</h2>
        <Link href="/dashboard/admin/users">
          <Button variant="outline">Manage Users</Button>
        </Link>
      </div>

      <Link href="/dashboard/admin/payments">
        <Button variant="ghost" className="w-full justify-start">
          💳 View All Payments
        </Button>
      </Link>

      {/* 📊 Stats Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">📊 Admin Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Users" value={stats.totalUsers} />
          <StatCard label="Listings" value={stats.totalListings} />
          <StatCard label="Approved" value={stats.approvedListings} />
          <StatCard label="Pending" value={stats.pendingListings} />
        </div>
      </div>

      {/* 🏠 Listings Section
            <div>
              <h2 className="text-2xl font-bold mb-6">Listings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
                  <div key={property.id} className="border p-4 rounded-xl relative">
                    <PropertyCard property={property} />
                    <p className="text-xs text-gray-500 mt-2">
                      Seller: {property.seller?.email || "Unknown"}
                    </p>
                    <DeleteButton propertyId={property.id} />
                  </div>
                ))}
              </div>
            </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="border p-4 rounded-xl relative">
          <PropertyCard property={{ ...property, bhk: property.bhk ?? "" }} />
            {property.featured && (
              <div className="absolute top-2 right-2 bg-yellow-300 text-black text-xs px-2 py-1 rounded-full font-semibold shadow">
                ⭐ Featured
              </div>
            )}
            <p className="text-xs text-yellow-700 mt-1">
              {property.featured ? "Featured Listing ✅" : "Not Featured"}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Seller: {property.seller?.email || "Unknown"}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-2">
              <DeleteButton propertyId={property.id} />

              {property.status !== "approved" && (
                <form
                  action={`/api/properties/${property.id}/approve`}
                  method="POST"
                >
                  <Button type="submit" variant="default" className="w-full">
                    ✅ Approve
                  </Button>
                </form>
              )}

              {property.status !== "rejected" && (
                <form
                  action={`/api/properties/${property.id}/reject`}
                  method="POST"
                >
                  <Button
                    type="submit"
                    variant="destructive"
                    className="w-full"
                  >
                    ❌ Reject
                  </Button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-10 mb-4">Users</h2>
      <div className="overflow-auto rounded-lg border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Properties</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.properties.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
