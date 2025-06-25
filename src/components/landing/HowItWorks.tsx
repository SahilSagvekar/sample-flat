// components/landing/HowItWorks.tsx
export function HowItWorks() {
  const steps = [
    { title: "Search Listings", desc: "Use filters to find your perfect home." },
    { title: "Book Appointment", desc: "Choose a time and book a visit." },
    { title: "Connect & Close", desc: "Meet the seller and make the deal." },
  ];

  return (
    <section className="py-14 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white shadow-sm rounded-xl p-6 text-center">
              <div className="text-2xl font-bold mb-2 text-primary">{i + 1}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
