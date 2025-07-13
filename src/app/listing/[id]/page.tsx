// Redesigned Property Page - Mobile Responsive & Styled Around #2BBBC1

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Star, Bed, Bath, Calendar, User, Check, BadgeCheck 
} from "lucide-react";
import ShareUrlButton from "@/components/landing/ShareUrlButton";
import FavoriteButton from "@/components/landing/FavoriteButton";
import { CalendlyModal } from "@/components/CalendlyModal";
import PropertyPageClient from "@/components/property/PropertyPageClient";

interface PropertyPageProps {
  params: { id: string };
}

export default async function PropertyPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: { seller: true },
  });
  if (!property) return notFound();

  // const mediaItems = [
  //   ...(property.imageUrls?.map((url) => ({ type: "image" as const, url })) || []),
  //   ...(property.sampleFlatVideo ? [{ type: "video" as const, url: property.sampleFlatVideo }] : []),
  //   ...(property.localityVideo ? [{ type: "video" as const, url: property.localityVideo }] : []),
  // ];

 return <PropertyPageClient property={property} />;
}

// function Feature({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
//   return (
//     <div className="flex items-center gap-2 p-3 border rounded-lg bg-white shadow-sm">
//       <div className="text-[#2BBBC1]">{icon}</div>
//       <div>
//         <p className="text-xs text-gray-500">{label}</p>
//         <p className="text-sm font-medium text-gray-900">{value}</p>
//       </div>
//     </div>
//   );
// }

export async function generateStaticParams() {
  const properties = await prisma.property.findMany({ select: { id: true } });
  return properties.map((property) => ({ id: property.id.toString() }));
}
