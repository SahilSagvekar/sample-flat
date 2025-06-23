import { prisma } from "@/lib/prisma";
import { AddPropertyForm } from "@/components/forms/edit-property-form";
import { auth } from "@clerk/nextjs/server";

export default async function EditPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();

  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property) return <div>Property not found</div>;

  // ❌ If the listing is already approved, block editing
  if (property.status === "approved") {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-red-600">Editing Not Allowed</h2>
        <p className="mt-2 text-gray-600">
          This property has already been approved and can no longer be edited.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
      <AddPropertyForm userId={userId} property={property} />
    </div>
  );
}
