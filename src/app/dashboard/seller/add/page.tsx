import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AddPropertyForm } from "@/components/forms/add-property-form";

export default async function AddPropertyPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Add a Property</h1>
      <AddPropertyForm userId={userId} />
    </div>
  );
}
