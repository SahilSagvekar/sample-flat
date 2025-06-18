"use client";

import { useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  property: {
    id: string;
    title: string;
    status: string;
    sellerId: string;
  };
};

export default function AdminPropertyCard({ property }: Props) {
  const [isPending, startTransition] = useTransition();

  const updateStatus = (status: "approved" | "rejected") => {
    startTransition(async () => {
      await fetch(`/api/admin/update-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: property.id, status }),
      });

      location.reload();
    });
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold">{property.title}</h2>
        <p className="text-sm text-gray-600 mb-2">Submitted by: {property.sellerId}</p>
        <p className="text-sm">Status: <strong>{property.status}</strong></p>
        <div className="mt-3 space-x-2">
          <Button onClick={() => updateStatus("approved")} disabled={isPending}>Approve</Button>
          <Button variant="destructive" onClick={() => updateStatus("rejected")} disabled={isPending}>Reject</Button>
        </div>
      </CardContent>
    </Card>
  );
}
