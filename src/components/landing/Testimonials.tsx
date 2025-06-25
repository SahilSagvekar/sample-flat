export function Testimonials() {
  const reviews = [
    {
      name: "Aman D.",
      text: "Booking appointments through SampleFlat was super easy and fast. 10/10!",
    },
    {
      name: "Sneha M.",
      text: "I found a perfect flat in just 2 days. The whole process was smooth and simple.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-800 mb-4">“{r.text}”</p>
              <div className="text-sm text-gray-500 font-semibold">— {r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
