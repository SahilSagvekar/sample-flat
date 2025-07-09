import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-start">
      {/* Left: Contact Info */}
      <div className="space-y-6">
        <h4 className="text-[#2BBBC1] font-semibold">Contact us</h4>
        <h2 className="text-4xl font-bold">Get in Touch</h2>
        <p className="text-gray-500">
          At SampleFlat, we bring your real estate dreams to life with dedication and expertise.
          Our experienced team is here to guide you every step of the way. Whether you’re buying,
          selling, or investing—reach out today and let’s turn your property goals into reality.
        </p>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="text-[#2BBBC1]" />
            <span>sampleflat@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-[#2BBBC1]" />
            <span>(307) 555–0133</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-[#2BBBC1]" />
            <span>3891 Ranchview Dr. Richardson, California 62639</span>
          </div>
        </div>

        <button className="inline-flex items-center gap-2 text-white bg-[#2BBBC1] hover:bg-[#25a9b0] px-5 py-2 rounded-md font-medium transition">
          Live Chat <ArrowRight size={18} />
        </button>
      </div>

      {/* Right: Form */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md">
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-sm">First Name</label>
              <input type="text" placeholder="e.g., John" className="w-full border rounded-md p-2 text-sm" />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">Last Name</label>
              <input type="text" placeholder="e.g., Smith" className="w-full border rounded-md p-2 text-sm" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-sm">Email Address</label>
              <input type="email" placeholder="e.g., john@example.com" className="w-full border rounded-md p-2 text-sm" />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">Phone Number</label>
              <input type="text" placeholder="e.g., 9876543210" className="w-full border rounded-md p-2 text-sm" />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Description</label>
            <textarea placeholder="e.g., We want to solve the problem…" className="w-full border rounded-md p-2 text-sm h-28 resize-none" />
          </div>

          <button
            type="submit"
            className="bg-[#2BBBC1] hover:bg-[#25a9b0] text-white px-5 py-2 rounded-md font-medium inline-flex items-center gap-2"
          >
            Submit form <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
