'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface CallSellerButtonProps {
  sellerId: string;
}

export const CallSellerButton = ({ sellerId }: CallSellerButtonProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCall = async () => {
  setLoading(true);
  try {
    const res = await fetch('/api/call/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sellerId }),
    });

    const data = await res.json();

    if (data.success) {
      toast({
        title: 'Calling seller...',
        description: 'Waiting for them to accept the call.',
      });
    } else {
      toast({
        title: 'Failed to initiate call',
        description: data.error || 'Unknown error',
        variant: 'destructive',
      });
    }
  } catch (err) {
    toast({
      title: 'Something went wrong',
      description: 'Could not place the call.',
      variant: 'destructive',
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <Button onClick={handleCall} disabled={loading}>
      {loading ? 'Calling...' : '📞 Call Seller'}
    </Button>
  );
};
