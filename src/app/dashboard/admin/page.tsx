import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import PropertyCard from "@/components/shared/property-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const { userId } = await auth();

  const users = await prisma.user.findMany({
    include: {
      properties: true,
    },
  });

  const [properties, stats] = await Promise.all([
    prisma.property.findMany({
      include: { seller: true },
      orderBy: { createdAt: "desc" },
    }),
    getStats(),
  ]);

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

  function StatCard({ label, value }: { label: string; value: number }) {
    return (
      <div className="bg-[#E6F8F9] dark:bg-zinc-900 rounded-2xl shadow-md p-6 text-center">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          {label}
        </h3>
        <p className="text-3xl font-extrabold text-[#2BBBC1]">{value}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-3xl font-extrabold text-[#2BBBC1]">Admin Dashboard</h2>
        <div className="flex gap-4">
          <Link href="/dashboard/admin/users">
            <Button variant="outline">Manage Users</Button>
          </Link>
          <Link href="/dashboard/admin/payments">
            <Button variant="ghost">💳 View All Payments</Button>
          </Link>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">📊 Platform Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="Users" value={stats.totalUsers} />
          <StatCard label="Listings" value={stats.totalListings} />
          <StatCard label="Approved" value={stats.approvedListings} />
          <StatCard label="Pending" value={stats.pendingListings} />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">🏡 All Listings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl shadow-md p-4 relative">
              <PropertyCard
                property={{
                  ...property,
                  bhk: property.bhk ?? "",
                  price: property.price ?? 0,
                  city: property.city ?? "",
                  state: property.state ?? "",
                  title: property.title ?? "",
                  status: property.status ?? "",
                  sellerId: property.sellerId ?? undefined,
                }}
              />

              {/* {property.featured && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold shadow">
                  ⭐ Featured
                </div>
              )} */}
              <p className="text-xs text-yellow-700 mt-2">
                {property.featured ? "Featured Listing ✅" : "Not Featured"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Seller: {property.seller?.email || "Unknown"}
              </p>

              <div className="flex flex-col gap-2 mt-4">
                <form action={`/api/properties/${property.id}/delete`} method="POST">
                  <Button type="submit" variant="default" className="w-full">
                    🗑️ Delete
                  </Button>
                </form>

                {property.status !== "approved" && (
                  <form action={`/api/properties/${property.id}/approve`} method="POST">
                    <Button type="submit" variant="default" className="w-full">
                      ✅ Approve
                    </Button>
                  </form>
                )}

                {property.status !== "rejected" && (
                  <form action={`/api/properties/${property.id}/reject`} method="POST">
                    <Button type="submit" variant="destructive" className="w-full">
                      ❌ Reject
                    </Button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">👤 Users</h3>
        <div className="overflow-auto rounded-xl border shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#2BBBC1]/10">
              <tr>
                <th className="p-4 font-semibold text-gray-600">User ID</th>
                <th className="p-4 font-semibold text-gray-600">Email</th>
                <th className="p-4 font-semibold text-gray-600">Properties</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-[#2BBBC1]/5">
                  <td className="p-4 text-gray-700">{user.id}</td>
                  <td className="p-4 text-gray-700">{user.email}</td>
                  <td className="p-4 text-gray-700">{user.properties.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
