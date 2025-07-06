"use client";

import { InlineWidget } from "react-calendly";

interface CalendlyWidgetProps {
  url: string;
}

export function CalendlyWidget({ url }: CalendlyWidgetProps) {
  return (
    <div className="mt-6">
      <InlineWidget url={url} styles={{ height: "700px", width: "100%" }} />
    </div>
  );
}
