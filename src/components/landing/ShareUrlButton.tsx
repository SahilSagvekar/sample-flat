"use client";

import { useState } from "react";

export default function ShareUrlButton() {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleShare = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    });
  };

  return (
    <div className="relative p-4">
      <div className="relative inline-block">
        <button
          onClick={handleShare}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Share
        </button>

        {showAlert && (
          <div className="absolute top-1/2 left-full ml-3 transform -translate-y-1/2 bg-green-500 text-white text-sm px-3 py-1 rounded shadow-lg">
            Link copied!
          </div>
        )}
      </div>
    </div>
  );
}
