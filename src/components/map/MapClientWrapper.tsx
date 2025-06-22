"use client";

import dynamic from "next/dynamic";

const MapWrapper = dynamic(() => import("./MapWrapper"), {
  ssr: false,
});

export default function MapClientWrapper({ properties }: { properties: any[] }) {
  return <MapWrapper properties={properties} />;
}
