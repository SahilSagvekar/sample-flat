'use client';

import { useSignUp, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller' | ''>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.update({
        publicMetadata: {
          role,
        },
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setLoading(true);
      router.push('/verify-email');
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Create an Account</h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-6">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 00-10 10h4z"
              />
            </svg>
            <p className="text-gray-700 mt-3">Redirecting to verification page...</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'buyer' | 'seller')}
                className="w-full px-3 py-2 border rounded text-gray-700"
                required
              >
                <option value="">Select Role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div id="clerk-captcha" className="my-2" />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Sign Up
              </button>
            </form>

            {/* 👇 Already have account - Sign In modal */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
              <SignInButton mode="modal">
                <button className="text-blue-700 hover:underline">Sign In</button>
              </SignInButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
