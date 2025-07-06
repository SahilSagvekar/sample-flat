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
            Navigating real estate doesn’t have to be hard. With our streamlined process, you can
            discover, schedule, and finalize your perfect property quickly and confidently.
          </p>

          <div className="space-y-5">
            {[
              {
                title: "Search Properties",
                desc: "Find verified listings that match your needs and budget.",
              },
              {
                title: "Connect with an Agent",
                desc: "Get expert advice and property guidance instantly.",
              },
              {
                title: "Schedule a Tour",
                desc: "Book viewings that work with your schedule—online or in person.",
              },
              {
                title: "Close the Deal",
                desc: "Finalize transactions smoothly with full support.",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-800">
                  <strong>{item.title}</strong>: {item.desc}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="mt-8 inline-block bg-orange-500 text-white font-medium px-6 py-3 rounded-md hover:bg-orange-600 transition"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </section>
  );
}
