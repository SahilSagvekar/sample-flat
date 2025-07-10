// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <SignIn />
//     </div>
//   );
// }


"use client";

import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
        <p className="text-gray-500">Sign in to access your dashboard and manage your listings.</p>

        <SignInButton mode="modal"
        //  redirectUrl="/dashboard/buyer"
         >
          <Button className="w-full">Sign In with Clerk</Button>
        </SignInButton>

        <p className="text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <span
            className="text-primary font-medium cursor-pointer"
            onClick={() => router.push("/sign-up")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
