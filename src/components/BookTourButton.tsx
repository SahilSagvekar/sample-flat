'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function BookTourButton({ propertyId }: { propertyId: string }) {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (!isSignedIn) {
      alert('🚪 Please sign in or create an account to book a property tour.');
      // router.push('/sign-up');
    } else {
      router.push(`/listing/${propertyId}`);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="default"
      className="w-full bg-emerald-600 hover:bg-emerald-700"
    >
      📅 Book Tour
    </Button>
  );
}
