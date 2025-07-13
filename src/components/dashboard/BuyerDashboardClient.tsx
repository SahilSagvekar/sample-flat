"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useCurrentUser } from '@/hooks/useUserRoleFromDB';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/shared/property-card";

export default function BuyerDashboardClient() {
  const { user } = useUser();
  const user2 = useCurrentUser();

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [calendlyLink, setCalendlyLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [paid, setpaid] = useState(false);

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;
      const res = await fetch(`/api/user/${user.id}`);
      const data = await res.json();
      setCalendlyLink(data.calendlyLink || "");
      setpaid(data.paid);
    };

    fetchUser();
  }, [user?.id]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch("/api/seller/properties");
      const data = await res.json();
      setProperties(data || []);
      setLoading(false);
    };

    fetchProperties();
  }, [user?.id]);

  const statusCount = {
    total: properties.length,
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
      if (res.ok) setSaved(true);
    } catch (err) {
      console.error("Error saving Calendly link", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 px-4 md:px-8 py-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2BBBC1]">My Profile & Listings</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow border p-4 space-y-3">
        <h2 className="text-lg font-semibold text-[#2BBBC1]">Your Profile</h2>
        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
          <p><strong>Email:</strong> {user?.emailAddresses?.[0]?.emailAddress}</p>
          <p><strong>Paid:</strong> {user2?.paid ? "✅ Yes" : "❌ No"}</p>
        </div>
      </div>
    </div>
  );
}

function OverviewCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="bg-white rounded-xl shadow border p-4 text-center">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-[#2BBBC1]">{count}</div>
    </div>
  );
}
