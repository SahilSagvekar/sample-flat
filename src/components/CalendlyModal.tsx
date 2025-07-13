"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { CalendlyWidget } from "./CalendlyWidget";

export function CalendlyModal({ url }: { url: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
  onClick={() => setIsOpen(true)}
  className="mt-4 flex items-center justify-center gap-2 w-full sm:w-auto bg-[#2BBBC1] hover:bg-[#25a5aa] text-white px-5 py-2.5 rounded-xl font-semibold shadow transition duration-200"
>
  <span>📅</span>
  <span>Book a Video Call</span>
</button>


      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-3xl w-full rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold">Book a Video Tour</Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ❌ Close
              </button>
            </div>
            <CalendlyWidget url={url} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
