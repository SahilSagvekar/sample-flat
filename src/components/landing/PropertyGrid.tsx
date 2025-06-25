"use client";

import PropertyCard from "@/components/shared/property-card";
import { useEffect, useState } from "react";
import { getAllProperties } from "@/lib/api";

export function PropertyGrid() {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    async function fetch() {
      const res = await getAllProperties();
      setProperties(res);
    }
    fetch();
  }, []);

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">All Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
