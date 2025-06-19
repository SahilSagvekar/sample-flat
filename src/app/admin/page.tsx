import { redirect } from "next/navigation";
import { getOrCreateUser } from "@/lib/getOrCreateUser"; // this should return DB user (with role)
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/shared/property-card";

export default async function AdminDashboardPage() {
  const dbUser = await getOrCreateUser();

  if (dbUser.role !== "admin") {
    redirect("/");
  }

  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: { seller: true },
  });

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">All Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="border p-4 rounded">
              <PropertyCard property={property} />
              <p className="text-xs text-gray-500 mt-2">
                Seller: {property.seller?.email || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <div key={user.id} className="border p-4 rounded text-sm">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Paid:</strong> {user.paid ? "✅" : "❌"}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
