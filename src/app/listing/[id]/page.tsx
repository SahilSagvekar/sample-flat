import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PropertyPageClient from "@/components/property/PropertyPageClient";

interface PropertyPageProps {
  params: {
    id: string;
  };
}

// ✅ async function definition is fine here
export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: { seller: true },
  });

  if (!property) return notFound();

  return <PropertyPageClient property={property} />;
}

// ✅ generateStaticParams function must return an array of params
export async function generateStaticParams() {
  const properties = await prisma.property.findMany({ select: { id: true } });

  return properties.map((property) => ({
    id: property.id.toString(),
  }));
}
