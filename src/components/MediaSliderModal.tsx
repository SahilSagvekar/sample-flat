"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface MediaItem {
  type: "image" | "video";
  url: string;
  title?: string;
}

export default function MediaSliderModal({
  media,
  onClose,
}: {
  media: MediaItem[];
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === media.length - 1 ? 0 : prev + 1));

  const currentMedia = media[current];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>

      <div className="max-w-3xl w-full px-4">
        {currentMedia.type === "image" ? (
          <img
            src={currentMedia.url}
            alt={`Media ${current + 1}`}
            className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
          />
        ) : (
          <video
            src={currentMedia.url}
            controls
            className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
          />
        )}
        {currentMedia.title && (
          <p className="text-white text-center mt-2 text-sm opacity-80">
            {currentMedia.title}
          </p>
        )}
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
      >
        <ChevronRight className="w-10 h-10" />
      </button>
    </div>
  );
}
