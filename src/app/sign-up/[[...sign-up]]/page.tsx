"use client";

import { useSignUp, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"buyer" | "seller" | "">("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.update({
        unsafeMetadata: {
          name,
          phone,
          role,
        },
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setLoading(true);
      router.push("/verify-email");
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Create your account
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-6">
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
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
            <p className="text-gray-700 mt-4 text-sm">
              Redirecting to verification page...
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  placeholder="+91XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Select Role</label>
                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value as "buyer" | "seller")
                  }
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-700"
                >
                  <option value="">Choose one</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>

              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

              <div id="clerk-captcha" className="my-2" />

              <button
                type="submit"
                className="w-full bg-[#2BBBC1] hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition duration-150 ease-in-out"
              >
                Sign Up
              </button>
            </form>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-1">
                Already have an account?
              </p>
              <SignInButton mode="modal">
                <button className="text-blue-600 hover:underline text-sm font-medium">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
