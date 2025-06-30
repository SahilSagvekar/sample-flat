// app/call/[room]/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function VideoCallPage({ params }: { params: { room: string } }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!params.room) {
      router.push('/');
    }
  }, [params.room, router]);

  return (
    <div className="w-full h-screen">
      <iframe
        ref={iframeRef}
        src={params.room}
        allow="camera; microphone; fullscreen; display-capture"
        className="w-full h-full border-none"
        title="Daily Video Call"
      />
    </div>
  );
}
