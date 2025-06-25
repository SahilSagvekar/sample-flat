"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAuthUserId } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/shared/property-card";
import Link from "next/link";

export default function SellerDashboardPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch("/api/seller/properties"); // 👈 Create this API route
      const data = await res.json();
      setProperties(data || []);
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const statusCount = {
    total: properties.length,
    approved: properties.filter((p) => p.status === "approved").length,
    pending: properties.filter((p) => p.status === "pending").length,
    rejected: properties.filter((p) => p.status === "rejected").length,
  };

  const handlePayment = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout failed");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <Link href="/dashboard/seller/appointments">
          <Button variant="ghost">📅 My Appointments</Button>
        </Link>
      </div>

      {error === "access-denied" && (
        <p className="text-red-600 font-semibold">❌ You need to pay ₹99 to list a property.</p>
      )}

      <Button onClick={handlePayment}>Pay ₹99 to List Your Property</Button>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <OverviewCard title="Total" count={statusCount.total} />
        <OverviewCard title="Approved" count={statusCount.approved} />
        <OverviewCard title="Pending" count={statusCount.pending} />
        <OverviewCard title="Rejected" count={statusCount.rejected} />
      </div>

      {/* Listings */}
      {loading ? (
        <p>Loading listings...</p>
      ) : properties.length === 0 ? (
        <p className="text-gray-500">You haven't listed any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="relative">
              <PropertyCard property={property} />
              <Badge
                className="absolute top-2 left-2 capitalize text-xs"
                variant={
                  property.status === "approved"
                    ? "default"
                    : property.status === "pending"
                    ? "secondary"
                    : "destructive"
                }
              >
                {property.status}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OverviewCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="bg-white rounded-xl shadow border p-4 text-center">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-bold">{count}</div>
    </div>
  );
}
