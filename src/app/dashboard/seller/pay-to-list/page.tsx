// app/dashboard/seller/pay-to-list/page.tsx
"use client";

import { Button } from "@/components/ui/button";

export default function PayToListPage() {
  const handlePay = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-4 text-center space-y-4">
      <h2 className="text-2xl font-bold">Pay ₹99 to List Your Property</h2>
      <p className="text-sm text-gray-600">
        As per our platform policy, only verified sellers with access can list their properties.
      </p>
      <Button onClick={handlePay}>💳 Pay ₹99</Button>
    </div>
  );
}
