'use client';

import { useState } from "react";

interface PropertyImageProps {
  src: string;
  alt: string;
}

export default function PropertyImage({ src, alt }: PropertyImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className="object-cover w-full h-full"
      onError={() => setImgSrc("/fallback.jpg")}
    />
  );
}
