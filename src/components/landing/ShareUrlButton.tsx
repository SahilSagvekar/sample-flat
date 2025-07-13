"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export default function ShareUrlButton() {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleShare = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 bg-[#2BBBC1] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#25a8ae] transition shadow"
      >
        <Copy size={16} />
        Share
      </button>

      {showAlert && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded shadow-md z-10 animate-fade-in-out">
          Link copied!
        </div>
      )}
    </div>
  );
}
