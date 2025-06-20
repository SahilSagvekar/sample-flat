"use client";

import { Button } from "@/components/ui/button";

export default function DeleteButton({ propertyId }: { propertyId: string }) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete?");
    if (!confirmed) return;

    const res = await fetch(`/api/properties/${propertyId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      location.reload(); // or use router.refresh() if needed
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <Button
      variant="destructive"
      className="mt-2"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}
