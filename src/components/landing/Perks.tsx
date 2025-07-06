"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const perks = [
  {
    icon: "/icons/verified.svg",
    title: "Verified Listings",
    desc: "Every property is manually vetted for authenticity.",
  },
  {
    icon: "/icons/secure-pay.svg",
    title: "Secure Payments",
    desc: "Stripe-backed, end-to-end encrypted transactions.",
  },
  {
    icon: "/icons/quick-book.svg",
    title: "Easy Booking",
    desc: "Instant appointment slots with just one click.",
  },
  {
    icon: "/icons/expert-support.svg",
    title: "Expert Support",
    desc: "Dedicated relationship managers to guide you.",
  },
];

export function Perks() {
  return (
    <motion.section
      className="bg-black py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
      }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Sign-Up Perks</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk) => (
            <motion.div
              key={perk.title}
              className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center shadow-inner">
                  <Image
                    src={perk.icon}
                    alt={perk.title}
                    width={28}
                    height={28}
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{perk.title}</h3>
              <p className="text-sm text-gray-600">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
