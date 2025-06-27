"use client";

import dynamic from "next/dynamic";
import { Property } from "@/types"; // Assuming you have a Property type

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-gray-200 rounded-xl animate-pulse" />
  ),
});

export default function MapClientWrapper({ properties }: { properties: Property[] }) {
  return (
    <div className="rounded-xl border overflow-hidden bg-white dark:bg-gray-900 h-[500px]">
      <MapView properties={properties} />
    </div>
  );
}