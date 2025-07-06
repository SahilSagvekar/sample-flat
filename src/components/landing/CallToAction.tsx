"use client";

import Link from "next/link";

export function CallToAction() {
  return (
    <section className="bg-white py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to list your property?
        </h2>
        <p className="text-gray-600 mb-8">
          Start earning by showcasing your property to thousands on <span className="font-semibold text-orange-500">BuyerBuilder</span>.
        </p>
        <Link
          href="/dashboard/seller/add"
          className="inline-block bg-orange-500 text-white font-medium px-6 py-3 rounded-xl shadow hover:bg-orange-600 transition"
        >
          Post a Property
        </Link>
      </div>
    </section>
  );
}
