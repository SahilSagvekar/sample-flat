'use client';

import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });

        const role = result?.unsafeMetadata?.role;

        if (role === 'seller') {
          router.push('/dashboard/seller');
        } else {
          router.push('/dashboard/buyer');
        }
      } else {
        setError('Verification not complete.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || 'Invalid code.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Verify Your Email</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter the 6-digit code sent to your email
        </p>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Verification Code"
            maxLength={6}
            className="w-full px-3 py-2 border rounded text-center text-lg tracking-widest"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Verify & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
