"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export function ContactSection() {
  return (
    <section className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center bg-white rounded-3xl shadow-2xl p-10 md:p-16">
        
        {/* Form Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            BuyerBuilder Inquiry Form
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Send us your inquiry and we’ll help you find your ideal property.
          </p>

          <form className="space-y-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select>
                <SelectTrigger className="h-14">
                  <SelectValue placeholder="Inquiry Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buying">Buying</SelectItem>
                  <SelectItem value="selling">Selling</SelectItem>
                  <SelectItem value="renting">Renting</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-14">
                  <SelectValue placeholder="Salutation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mr">Mr.</SelectItem>
                  <SelectItem value="ms">Ms.</SelectItem>
                  <SelectItem value="dr">Dr.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input placeholder="Your Name" className="h-14 text-lg" />
              <Input
                placeholder="Your Email"
                type="email"
                className="h-14 text-lg"
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select>
                <SelectTrigger className="h-14">
                  <SelectValue placeholder="Personnel Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                </SelectContent>
              </Select>

              <Input placeholder="Phone Number" className="h-14 text-lg" />
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input placeholder="Max Budget" className="h-14 text-lg" />
              <Input placeholder="Min Size (sq ft)" className="h-14 text-lg" />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-400 to-[#2BBBC1]"
            >
              Submit Inquiry
            </Button>
          </form>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-xl hidden md:block">
          <Image
            src="/real-estate.jpg" // Make sure this image is in /public
            alt="Real estate"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
