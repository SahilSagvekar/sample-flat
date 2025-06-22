"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function MapWrapper({ properties }: { properties: any[] }) {
  return (
    <div className="lg:col-span-2 h-[500px]">
      <MapView properties={properties} />
    </div>
  );
}
