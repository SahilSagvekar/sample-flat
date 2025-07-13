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
    select: { 
      role: true,
      paid: true,
     },
  });

 if (!user || !["seller", "admin"].includes(user.role)) {
  throw new Error("Only sellers or admins can post a property");
}
  const showError = !user || !["seller", "admin"].includes(user.role);

if (showError) {  
    return <p className="text-red-500 text-sm">Only sellers or admins can post a property.</p>;
  }  


  // ✅ Check if seller has paid access
  // const access = await prisma.listingAccess.findUnique({
  //   where: { userId },
  // });

  // if (!access || !access.hasAccess) {
  //   redirect("/dashboard/seller/pay-to-list");
  // }

  if ( user && (user.paid !== true)) {
    redirect("/dashboard/seller/pay-to-list");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Add Your Property
        </h1>

        <div className="flex flex-col-reverse lg:flex-row gap-10 items-start">
          {/* 📝 Property Form */}
          <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
            <AddPropertyForm userId={userId} />
          </div>

          {/* 📢 Sidebar Info */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
              <img
                src="/trust.jpg"
                alt="Trust Illustration"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Why List With Us?</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Get visibility with verified buyers</li>
                <li>Showcase photos and videos</li>
                <li>Update and manage anytime</li>
                <li>Chat securely with buyers</li>
              </ul>
            </div>

            <div className="text-center text-sm text-gray-500">
              Need help? <a href="mailto:support@sampleflat.in" className="text-[#2BBBC1] hover:underline">support@sampleflat.in</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
