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
    <section className="bg-black py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Stay in the Loop
        </h2>
        <p className="text-gray-600 mb-8">
          Sign up for exclusive property alerts, market insights, and special offers.
        </p>

        <form
          onSubmit={handleSignup}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-[350px] border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow transition"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </section>
  );
}
