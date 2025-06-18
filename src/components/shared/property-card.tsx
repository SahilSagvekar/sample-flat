import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type Props = {
  property: {
    id: string;
    title: string;
    bhk: string;
    price: number;
    city: string;
    state: string;
    status: string;
    sampleFlatVideo?: string;
    localityVideo?: string;
  };
};

export default function PropertyCard({ property }: Props) {
  return (
    <Card>
      <CardContent className="p-4 space-y-1">
        <Link
          href={`/listing/${property.id}`}
          className="text-xl font-semibold hover:underline"
        >
          {property.title}
        </Link>
        <p className="text-sm text-gray-600">
          {property.bhk} BHK – ₹{property.price}
        </p>
        <p className="text-sm">
          📍 {property.city}, {property.state}
        </p>
        <p
          className={`text-xs font-medium ${
            property.status === "approved"
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          Status: {property.status}
        </p>
        {property.sampleFlatVideo && (
          <video controls width="100%" className="rounded mt-2">
            <source src={property.sampleFlatVideo} />
            Your browser does not support the video tag.
          </video>
        )}
        {property.localityVideo && (
          <video controls width="100%" className="rounded mt-2">
            <source src={property.localityVideo} />
            Your browser does not support the video tag.
          </video>
        )}
      </CardContent>
    </Card>
  );
}
