// app/listing/[id]/page.tsx

import { prisma } from "@/lib/prisma";
import { AppointmentForm } from "@/components/forms/appointment-form";
import Image from "next/image";
import { notFound } from "next/navigation";

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
    include: {
      seller: true,
    },
  });

  if (!property) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <p className="text-gray-600">{property.locality}, {property.city}, {property.state}</p>
      </div>

      {/* Main Image */}
      <div className="w-full h-80 rounded-xl overflow-hidden">
        <Image
          src={property.imageUrls || "https://via.placeholder.com/800x400"}
          alt={property.title}
          className="object-cover"
          fill
        />
      </div>

      {/* Property Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
        <div><strong>Price:</strong> ₹{property.price.toLocaleString()}</div>
        <div><strong>BHK:</strong> {property.bhk}</div>
        {/* <div><strong>Type:</strong> {property.type || "N/A"}</div> */}
        <div><strong>Status:</strong> {property.status}</div>
        <div><strong>Area:</strong> {property.locality || "Not specified"}</div>
        <div><strong>Posted:</strong> {new Date(property.createdAt).toDateString()}</div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {property.description || "No description provided."}
        </p>
      </div>

      {/* Seller Info */}
      <div className="border-t pt-6 text-sm text-gray-600">
        <p><strong>Seller:</strong> {property.seller?.name || "Not available"}</p>
      </div>

      {/* Appointment Form */}
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">📅 Book a Visit</h2>
        <AppointmentForm
          propertyId={property.id}
          sellerId={property.sellerId}
        />
      </div>
    </main>
  );
}
