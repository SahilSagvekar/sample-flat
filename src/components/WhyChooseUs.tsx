import Image from "next/image";
import Link from "next/link";

export function WhyChooseUs() {
  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-[#2BBBC1]">BuyerBuilder</span>?
          </h2>
          <p className="text-gray-300 mb-6 max-w-lg">
            We’re committed to making your real estate journey smooth and stress-free.
            Whether you're buying or selling, BuyerBuilder offers unmatched
            support and clarity every step of the way.
          </p>

          <ul className="space-y-4 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#2BBBC1] mt-1">✔️</span>
              <span>
  <span className="font-semibold text-white">List & Browse</span>: Post your property or find your next home easily.
</span>

            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#2BBBC1] mt-1">✔️</span>
              <span>
                <span className="font-semibold text-white">Verified Listings</span>: Browse
                only verified and trusted properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#2BBBC1] mt-1">✔️</span>
              <span>
                <span className="font-semibold text-white">Tailored Solutions</span>: Get
                recommendations suited to your needs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#2BBBC1] mt-1">✔️</span>
              <span>
                <span className="font-semibold text-white">For buyers and sellers</span>:
                simple, fast, easy.
              </span>
            </li>
          </ul>

          {/* <Link
            href="/about"
            className="inline-block mt-8 bg-[#2BBBC1] text-white font-medium px-6 py-3 rounded-md hover:bg-orange-600 transition"
          >
            Learn More →
          </Link> */}
        </div>

        {/* Right: Single Image */}
        <div>
          <Image
            src="/choose-1.jpg"
            alt="Why choose SampleFlat"
            width={600}
            height={400}
            className="rounded-2xl shadow-xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
