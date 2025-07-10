'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/shared/property-card";
// import { IncomingCallSection } from "@/components/call/IncomingCallSection";

export default function SellerDashboardClient() {
  const { user } = useUser();

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [calendlyLink, setCalendlyLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch("/api/seller/properties");
      const data = await res.json();
      setProperties(data || []);
      setLoading(false);
    };

    const fetchCalendlyLink = async () => {
      if (!user?.id) return;
      const res = await fetch(`/api/user/${user.id}`);
      const data = await res.json();
      setCalendlyLink(data?.calendlyLink || "");
    };

    fetchProperties();
    fetchCalendlyLink();
  }, [user?.id]);

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

  const handleSaveCalendlyLink = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/seller/calendly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ calendlyLink }),
      });
      if (res.ok) {
        setSaved(true);
      }
    } catch (err) {
      console.error("Error saving Calendly link", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
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

      {/* Calendly Link Section */}
      <div className="bg-white rounded-xl shadow border p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">Add Your Calendly Link</h2>
        <input
          type="url"
          placeholder="https://calendly.com/your-link"
          value={calendlyLink}
          onChange={(e) => setCalendlyLink(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <Button onClick={handleSaveCalendlyLink} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
        {saved && <p className="text-green-600 mt-2">✅ Calendly link saved!</p>}
      </div>

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

      <h1 className="text-xl font-bold mt-8">Welcome, {user?.firstName}</h1>
      {/* <IncomingCallSection sellerId={user?.id || ""} /> */}
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
