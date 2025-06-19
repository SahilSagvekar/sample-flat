import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property) return {};

  return {
    title: property.title,
    description: `${property.bhk} | ${property.locality}, ${property.city}, ${property.state}`,
  };
}

export default async function ListingPage({ params }: Props) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property) return notFound();

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <div className="text-gray-700 text-lg">
        {property.bhk} BHK | ₹{property.price}
      </div>
      <div className="text-muted-foreground">
        {property.locality}, {property.city}, {property.state}
      </div>
      <div className="text-sm text-gray-500">
        Possession Date: {property.possessionDate}
      </div>

      {/* ✅ Render Uploaded Images */}
      {property.images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {property.images.map((url: string) => (
            <img
              key={url}
              src={url}
              alt="Property Image"
              className="rounded-lg w-full h-48 object-cover border"
            />
          ))}
        </div>
      )}

      {/* ✅ Embedded Sample Flat Video */}
      {property.sampleFlatVideo && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">Sample Flat Video</h2>
          <iframe
            className="w-full aspect-video rounded"
            src={property.sampleFlatVideo.replace("watch?v=", "embed/")}
            allowFullScreen
          />
        </div>
      )}

      {/* ✅ Embedded Locality Video */}
      {property.localityVideo && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">Locality Video</h2>
          <iframe
            className="w-full aspect-video rounded"
            src={property.localityVideo.replace("watch?v=", "embed/")}
            allowFullScreen
          />
        </div>
      )}

      {/* Amenities */}
      {property.amenities?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">Amenities</h2>
          <ul className="list-disc list-inside text-gray-700">
            {property.amenities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
