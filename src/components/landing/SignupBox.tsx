"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SignupBox() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/sign-up");
  };

  return (
    <section className="py-16 px-4 bg-indigo-50">
      <div className="max-w-2xl mx-auto bg-white border border-indigo-100 shadow-2xl rounded-2xl p-8 md:p-10">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">Sign Up For Free</h2>
        <p className="text-sm text-gray-600 mb-6">
          Get early access to listings, updates, and exclusive offers.
        </p>
        <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl shadow"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </section>
  );
}
