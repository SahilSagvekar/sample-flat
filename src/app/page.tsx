import { UserButton, auth } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">TheSampleFlat</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
