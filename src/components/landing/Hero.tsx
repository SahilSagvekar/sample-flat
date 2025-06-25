// components/landing/Hero.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] bg-[url('/hero-bg.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 z-0" />
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center text-white px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Discover Your Dream Property
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Explore verified listings, book appointments, and connect with trusted sellers.
        </p>
        <Button size="lg" className="bg-white text-black hover:bg-gray-200">
          Explore Listings
        </Button>
      </motion.div>
    </section>
  );
}
