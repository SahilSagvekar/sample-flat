// app/about/page.tsx
import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary mb-6">About BuyerBuilder</h1>

      <p className="text-lg text-muted-foreground mb-8">
        Welcome to <strong>BuyerBuilder</strong> — the simpler way to buy and sell property online.
        We believe real estate should be transparent, direct, and hassle-free.
        Our platform connects buyers and sellers across India with no middlemen.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">🌟 Our Mission</h2>
        <p className="text-muted-foreground">
          To empower individuals across India to <strong>list</strong>, <strong>discover</strong>,
          and <strong>finalize</strong> property deals confidently — all in one place.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">🚀 What Makes Us Different</h2>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2">
          <li><strong>Direct Listings:</strong> No brokers, no commissions.</li>
          <li><strong>Smart Search:</strong> Find homes, flats, apartments, and villas easily.</li>
          <li><strong>Easy Booking:</strong> Schedule visits that work for you.</li>
          <li><strong>Secure Platform:</strong> Post, connect, and close confidently.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">🙌 Built for Everyone</h2>
        <p className="text-muted-foreground">
          Whether you’re buying your first flat or selling a villa, BuyerBuilder makes it simple.
          We’re designed for users across India — from metro cities to small towns.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">📬 Let’s Connect</h2>
        <p className="text-muted-foreground">
          Got questions or ideas? Reach out at <a className="text-primary underline" href="mailto:support@BuyerBuilder.com">support@BuyerBuilder.com</a> or follow us on <a className="text-primary underline" href="#">LinkedIn</a>.
        </p>
      </section>
    </div>
  );
}
