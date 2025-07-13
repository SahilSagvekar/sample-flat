// app/about/page.tsx
'use client';
import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-[#2BBBC1] mb-6 text-center md:text-left">
        About BuyerBuilder
      </h1>

      <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
        Welcome to <span className="font-semibold text-[#2BBBC1]">BuyerBuilder</span> — the simpler way to buy and sell property online.
        We believe real estate should be transparent, direct, and hassle-free.
        Our platform connects buyers and sellers across India with <span className="font-semibold">no middlemen</span>.
      </p>

      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          🌟 Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed">
          To empower individuals across India to <strong>list</strong>, <strong>discover</strong>,
          and <strong>finalize</strong> property deals confidently — all in one place.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          🚀 What Makes Us Different
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li><strong>Direct Listings:</strong> No brokers, no commissions.</li>
          <li><strong>Smart Search:</strong> Find homes, flats, apartments, and villas easily.</li>
          <li><strong>Easy Booking:</strong> Schedule visits that work for you.</li>
          <li><strong>Secure Platform:</strong> Post, connect, and close confidently.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          🙌 Built for Everyone
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Whether you’re buying your first flat or selling a villa, 
          <span className="font-semibold text-[#2BBBC1]"> BuyerBuilder </span> makes it simple.
          We’re designed for users across India — from metro cities to small towns.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          📬 Let’s Connect
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Got questions or ideas? Reach out at{" "}
          <a className="text-[#2BBBC1] underline" href="mailto:support@BuyerBuilder.com">
            support@BuyerBuilder.com
          </a>{" "}
          or follow us on{" "}
          <a className="text-[#2BBBC1] underline" href="#">
            LinkedIn
          </a>.
        </p>
      </section>
    </div>
  );
}
