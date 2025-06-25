import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/DeleteButton";

interface AdminPropertyPageProps {
  params: { id: string };
}

export default async function AdminPropertyPage({ params }: AdminPropertyPageProps) {
  const { userId } = await auth();
  // Optional: Lock this page to admin only
  // if (userId !== "your_admin_clerk_id") redirect("/");

  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      seller: true,
    },
  });

  if (!property) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <p className="text-gray-600">{property.locality}</p>

      <div className="rounded-xl overflow-hidden">
        <img
          src={property.imageUrls || "https://via.placeholder.com/800x400"}
          alt={property.title}
          className="w-full h-80 object-cover"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <p><strong>Price:</strong> ₹{property.price}</p>
        <p><strong>BHK:</strong> {property.bhk}</p>
        <p><strong>City:</strong> {property.city}</p>
        <p><strong>State:</strong> {property.state}</p>
        <p><strong>Status:</strong> {property.status}</p>
        <p><strong>Featured:</strong> {property.featured ? "✅ Yes" : "❌ No"}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Seller Info</h2>
        <p><strong>ID:</strong> {property.seller?.id}</p>
        <p><strong>Email:</strong> {property.seller?.email}</p>
      </div>

      <div className="flex gap-4 mt-8">
        {property.status !== "approved" && (
          <form action={`/api/properties/${property.id}/approve`} method="POST">
            <Button type="submit">✅ Approve</Button>
          </form>
        )}

        {property.status !== "rejected" && (
          <form action={`/api/properties/${property.id}/reject`} method="POST">
            <Button type="submit" variant="destructive">❌ Reject</Button>
          </form>
        )}

        <DeleteButton propertyId={property.id} />
      </div>
    </div>
  );
}
