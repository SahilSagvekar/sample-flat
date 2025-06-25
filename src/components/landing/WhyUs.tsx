export function WhyUs() {
  const benefits = [
    { title: "Verified Listings", desc: "Every property is manually approved." },
    { title: "Secure Payments", desc: "Safe and fast Stripe integration." },
    { title: "Direct Booking", desc: "Set appointments with one click." },
    { title: "Mobile Friendly", desc: "Use it on any device, anywhere." },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">Why Choose SampleFlat?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
