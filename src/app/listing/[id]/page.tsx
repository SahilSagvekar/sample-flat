// app/listing/[id]/page.tsx

import { prisma } from "@/lib/prisma";
import { AppointmentForm } from "@/components/forms/appointment-form";

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await prisma.property.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!property) return <div>Property not found</div>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-4">{property.locality}</p>

      <div className="mb-6">
        <img
          src={property.images || "https://via.placeholder.com/800x400"}
          alt={property.title}
          className="rounded-xl w-full h-80 object-cover"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <p><strong>Price:</strong> ₹{property.price}</p>
        <p><strong>Bedrooms:</strong> {property.bhk}</p>
        <p><strong>Type:</strong> {property.title}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        {/* <p>{property.description}</p> */}
        <p>Handle Description and tpe in property schema </p>
      </div>
      <AppointmentForm propertyId={property.id} />
      {/* <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
        Book Appointment
      </button> */}
     
    </main>
  );
}
