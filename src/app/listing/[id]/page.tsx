import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { AppointmentForm } from "@/components/forms/appointment-form";

type Props = {
  params: {
    id: string;
  };
};

export default async function ListingPage({ params }: Props) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property || property.status !== "approved") return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-4">
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <p className="text-lg">{property.bhk} BHK – ₹{property.price}</p>
      <p className="text-sm text-gray-600">{property.city}, {property.state}, {property.locality}</p>
      <p className="text-sm text-gray-800">Possession: {property.possessionDate}</p>
      <p className="text-sm text-gray-800">Amenities: {property.amenities.join(", ")}</p>

      {property.sampleFlatVideo && (
        <div>
          <h3 className="font-semibold mt-4">Sample Flat Video</h3>
          <video controls className="w-full rounded">
            <source src={property.sampleFlatVideo} />
          </video>
        </div>
      )}

      {property.localityVideo && (
        <div>
          <h3 className="font-semibold mt-4">Locality Video</h3>
          <video controls className="w-full rounded">
            <source src={property.localityVideo} />
          </video>
        </div>
      )}

      <h3 className="text-lg font-semibold mt-8">Schedule Appointment</h3>
<AppointmentForm propertyId={property.id} sellerId={property.sellerId} />
    </div>
  );
}
