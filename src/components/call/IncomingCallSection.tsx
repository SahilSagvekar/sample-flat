// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';

// interface CallData {
//   id: string;
//   buyerId: string;
//   sellerId: string;
//   status: string;
// }

// export const IncomingCallSection = ({ sellerId }: { sellerId: string }) => {
//   const [call, setCall] = useState<CallData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { toast } = useToast();

//   // Poll every 5 seconds for incoming calls
//   useEffect(() => {
//     const poll = async () => {
//       try {
//         const res = await fetch(`/api/call/incoming?sellerId=${sellerId}`);
//         const data = await res.json();
//         if (data?.status === 'pending') {
//           setCall(data);
//         }
//       } catch (error) {
//         console.error("Polling error:", error);
//       }
//     };

//     const interval = setInterval(poll, 5000);
//     return () => clearInterval(interval);
//   }, [sellerId]);

//   const handleAccept = async () => {
//     if (!call) return;
//     setLoading(true);
//     try {
//       const res = await fetch('/api/call/accept', {
//         method: 'POST',
//         body: JSON.stringify({ callId: call.id }),
//         headers: { 'Content-Type': 'application/json' },
//       });

//       const data = await res.json();
//       if (data.roomUrl) {
//         router.push(`/call/${encodeURIComponent(data.roomUrl)}`);
//       }
//     } catch (err) {
//       toast({
//         title: 'Failed to accept call',
//         description: 'Please try again.',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReject = async () => {
//     if (!call) return;
//     setLoading(true);
//     try {
//       await fetch('/api/call/reject', {
//         method: 'POST',
//         body: JSON.stringify({ callId: call.id }),
//         headers: { 'Content-Type': 'application/json' },
//       });

//       setCall(null);
//       toast({ title: 'Call rejected' });
//     } catch (err) {
//       toast({
//         title: 'Failed to reject call',
//         description: 'Please try again.',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!call) return null;

//   return (
//     <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg shadow-sm mt-4">
//       <p className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">
//         📞 Incoming call from a buyer
//       </p>
//       <div className="mt-3 flex gap-4">
//         <Button
//           disabled={loading}
//           onClick={handleAccept}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           Accept Call
//         </Button>
//         <Button
//           disabled={loading}
//           variant="destructive"
//           onClick={handleReject}
//         >
//           Reject
//         </Button>
//       </div>
//     </div>
//   );
// };
