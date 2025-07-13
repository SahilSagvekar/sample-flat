// app/property/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PropertyPageClient from "@/components/property/PropertyPageClient";

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: { seller: true },
  });

  if (!property) return notFound();

  return <PropertyPageClient property={property} />;
}
