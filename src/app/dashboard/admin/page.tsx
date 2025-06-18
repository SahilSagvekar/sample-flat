import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminPropertyCard from "@/components/shared/admin-property-card";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  // const dbUser = await prisma.user.findUnique({
  //   where: { clerkId: user.id },
  // });

  // if (dbUser?.role !== "admin") redirect("/");

  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel – All Properties</h1>
      {properties.length === 0 ? (
        <p>No listings yet.</p>
      ) : (
        properties.map((property) => (
          <AdminPropertyCard key={property.id} property={property} />
        ))
      )}
    </div>
  );
}
