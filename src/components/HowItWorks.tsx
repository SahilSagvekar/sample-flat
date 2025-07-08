import Image from "next/image";
import Link from "next/link";

export  function HowItWorks() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image on Left */}
        <div>
          <Image
            src="/how-it-works.jpg"
            alt="Property handover"
            width={600}
            height={400}
            className="rounded-xl shadow-lg w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Real estate made simple. Whether you're looking to buy or sell, our platform makes the process quick and easy.
          </p>

          <div className="space-y-5">
            {[
              {
                title: "Browse Properties",
                desc: "Explore listings posted directly by property owners and sellers across India.",
              },
              {
                title: "List Your Property",
                desc: "Easily create a listing with photos, details, and pricing—all in a few steps.",
              },
              {
                title: "Connect Directly",
                desc: "Buyers and sellers can message each other directly—no middlemen involved.",
              },
              {
                title: "Schedule a Visit",
                desc: "Buyers can book in-person or virtual tours at a time that works for them.",
              },
               {
                title: "Finalize the Deal",
                desc: "Close the deal on your terms, with complete transparency and control.",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-[#2BBBC1] text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-800">
                  <strong>{item.title}</strong>: {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* <Link
            href="/about"
            className="mt-8 inline-block bg-[#2BBBC1] text-white font-medium px-6 py-3 rounded-md hover:bg-orange-600 transition"
          >
            Learn More →
          </Link> */}
        </div>
      </div>
    </section>
  );
}
