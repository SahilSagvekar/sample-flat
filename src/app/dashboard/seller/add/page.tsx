import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AddPropertyForm } from "@/components/forms/add-property-form";
import Footer from "@/components/ui/footer";

export default async function AddPropertyPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Content */}
      <main className="flex-grow max-w-8xl w-full mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Add a Property</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Placeholder for Image/Other Component */}
          <div className="w-full md:w-1/2 bg-gray-100 h-[400px] rounded-lg flex items-center justify-center text-gray-500">
            {/* Replace this with actual content/component later */}
            Left Component Placeholder
          </div>

          {/* Right Side Form */}
          <div className="w-full md:w-1/2">
            <AddPropertyForm userId={userId} />
          </div>
        </div>
      </main>

      {/* Full-Width Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}

