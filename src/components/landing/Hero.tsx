"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function Hero() {
  return (
    <div className="px-4 md:px-8 pt-2">
      <section className="relative w-full h-[85vh] bg-[url('/hero-bg.jpg')] bg-cover bg-center flex items-center justify-center rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-0 rounded" />

        <motion.div
          className="relative z-10 max-w-6xl w-full mx-auto px-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-3">
              Unlock the Door to Your Dream Property
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Your next home is just a click away.
            </p>

            {/* Stats */}
            {/* <div className="mt-6 flex justify-center gap-6 text-sm md:text-base flex-wrap">
              <div>✅ 25K+ Properties</div>
              <div>🏙️ 60+ Cities Covered</div>
              <div>🙌 18K+ Happy Buyers</div>
              <div>👨‍💼 9K+ Trusted Agents</div>
            </div> */}
          </div>

          {/* Rounded Search Section */}
          {/* <div className="bg-white/90 border border-white/20 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-center gap-4 text-black max-w-5xl mx-auto">
            <Tabs defaultValue="rent" className="w-full">
              <TabsList className="flex justify-center gap-2 w-full mb-4">
                <TabsTrigger value="rent">Rent</TabsTrigger>
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-10">₹0 - ₹10L</SelectItem>
                    <SelectItem value="10-50">₹10L - ₹50L</SelectItem>
                    <SelectItem value="50-1cr">₹50L - ₹1Cr</SelectItem>
                  </SelectContent>
                </Select>

                <Link href="/listing">
                  <Button className="bg-[#2BBBC1] text-white hover:bg-orange-600">
                    Browse Properties
                  </Button>
                </Link>
              </div>
            </Tabs>
          </div> */}

          {/* Tags */}
          <div className="text-sm mt-6 text-center flex flex-wrap justify-center gap-3 text-white/90">
            <span className="bg-white/20 px-3 py-1 rounded-full">🏠 Home</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              🏢 Apartment
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">🏘️ Flat</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              🌇 City Living
            </span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
