import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AddPropertyForm } from "@/components/forms/add-property-form";
import Footer from "@/components/ui/footer";
import { prisma } from "@/lib/prisma";

export default async function AddPropertyPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // 🔒 Check user role
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

//   if (!user || (user.role !== "seller" && user.role !== "admin")) {
//   redirect("/dashboard/seller?error=unauthorized-role");
// }


  // ✅ Check if seller has paid access
  const access = await prisma.listingAccess.findUnique({
    where: { userId },
  });

  if (!access || !access.hasAccess) {
    redirect("/dashboard/seller/pay-to-list");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-8xl w-full mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Add a Property</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Placeholder */}
          <div className="w-full md:w-1/2 bg-gray-100 h-[400px] rounded-lg flex items-center justify-center text-gray-500">
            Left Component Placeholder
          </div>

          {/* Right Side Form */}
          <div className="w-full md:w-1/2">
            <AddPropertyForm userId={userId} />
          </div>
        </div>
      </main>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}
