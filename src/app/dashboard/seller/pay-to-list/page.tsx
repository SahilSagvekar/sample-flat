"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PayToListPage() {
  const handlePay = async () => {
    // 1. Call backend to create Razorpay order
    const res = await fetch("/api/razor/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!data.orderId) {
      alert("Something went wrong while creating order.");
      return;
    }

    // 2. Razorpay payment options
    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: "Property Listing",
      description: "Access for Seller Property Listing",
      order_id: data.orderId,
      handler: async function (response: any) {
        // ✅ Call secure backend API to verify & update DB
        const verifyRes = await fetch("/api/razor/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        if (verifyRes.ok) {
          alert("Payment successful!");
          window.location.href = "/dashboard/seller";
        } else {
          alert("Payment verification failed!");
        }
      },
      prefill: {
        name: "Seller",
        email: "seller@example.com",
        contact: "9999999999",
      },
      notes: {
        type: "listing",
      },
      theme: { color: "#6366f1" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
