"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface MediaItem {
  type: "image" | "video";
  url: string;
  title?: string;
}

interface PropertyMediaGalleryProps {
  mediaItems: MediaItem[];
}

export default function PropertyMediaGallery({ mediaItems }: PropertyMediaGalleryProps) {
  const [mainMedia, setMainMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    if (mediaItems?.length > 0) {
      setMainMedia(mediaItems[0]);
    }
  }, [mediaItems]);

  if (!mediaItems || mediaItems.length === 0 || !mainMedia) {
    return <div>No media available.</div>;
  }

  return (
    <>
      {/* Main Media Display */}
      <div className="h-[500px] rounded-xl overflow-hidden relative shadow-md mb-4">
        {mainMedia.type === "image" ? (
          <Image
            src={mainMedia.url}
            alt="Main property media"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full">
            <video controls className="w-full h-full object-cover">
              <source src={mainMedia.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {mediaItems.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setMainMedia(item)}
            >
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt={`Property media ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <>
                  <Image
                    src="/video-thumbnail-placeholder.jpg"
                    alt={`Video thumbnail ${item.title || index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  {item.title && (
                    <div className="absolute bottom-1 left-1 text-xs text-white bg-black bg-opacity-50 px-1 rounded">
                      {item.title}
                    </div>
                  )}
                </>
              )}
              {mainMedia.url === item.url && (
                <div className="absolute inset-0 border-2 border-blue-500 rounded-lg" />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
