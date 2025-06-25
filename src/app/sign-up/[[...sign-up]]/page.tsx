// import { SignUp } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <SignUp />
//     </div>
//   );
// }


"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">Create an Account 🏠</h1>
        <p className="text-gray-500">Join to explore, list, or manage properties easily.</p>

        <SignUpButton mode="modal" redirectUrl="/dashboard/buyer">
          <Button className="w-full">Sign Up with Clerk</Button>
        </SignUpButton>

        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <span
            className="text-primary font-medium cursor-pointer"
            onClick={() => router.push("/sign-in")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
