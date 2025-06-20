"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Property {
  id: string;
  title: string;
  price: number;
  bhk: string;
  city: string;
  locality: string;
  images?: string[];
}

const ITEMS_PER_PAGE = 5;

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties");
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      }
    }

    fetchProperties();
  }, []);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const paginatedProperties = properties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const hasNext = startIndex + ITEMS_PER_PAGE < properties.length;
  const hasPrev = currentPage > 0;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Properties</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedProperties.map((property) => (
          <Link href={`/listing/${property.id}`} key={property.id}>
            <div className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              {Array.isArray(property.images) && property.images.length > 0 && (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{property.title}</h3>
                <p className="text-gray-600">₹ {property.price}</p>
                <p className="text-gray-500 text-sm">
                  {property.city}, {property.locality}
                </p>
                <p className="text-sm text-blue-500 font-medium">{property.bhk} BHK</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={!hasPrev}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          ⬅️ Prev
        </button>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={!hasNext}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}
