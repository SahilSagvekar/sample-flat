import { UserButton } from "@clerk/nextjs";
import Footer from "@/components/ui/footer";
import SearchBar from "@/components/ui/searchbar";
import PropertyList from "@/components/shared/home-property-card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-10">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">TheSampleFlat</h1>
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Search Bar */}
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-4xl">
            <SearchBar />
          </div>
        </div>

        {/* Welcome Text */}
        <p className="text-gray-700 text-xl text-center mb-10">
          Welcome to TheSampleFlat – find your next property with ease.
        </p>

        {/* Property List */}
        <div className="flex justify-center mb-16">
          <PropertyList />
        </div>

        {/* Why Choose Us */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-gray-100 rounded-xl">✅ Verified Listings</div>
            <div className="p-4 bg-gray-100 rounded-xl">🎥 HD Sample Flat + Locality Videos</div>
            <div className="p-4 bg-gray-100 rounded-xl">🏗️ Trusted Builders</div>
            <div className="p-4 bg-gray-100 rounded-xl">📞 Direct Buyer-Seller Appointments</div>
          </div>
        </section>

        {/* Explore by City */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Explore by City</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Mumbai', 'Pune', 'Bangalore', 'Hyderabad'].map((city) => (
              <div
                key={city}
                className="p-6 bg-blue-50 hover:bg-blue-100 cursor-pointer rounded-xl font-medium"
              >
                {city}
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="p-4">🔍 Browse Properties</div>
            <div className="p-4">📅 Book Appointment</div>
            <div className="p-4">📹 Visit or Video Call</div>
            <div className="p-4">🏠 Move In</div>
          </div>
        </section>

        {/* List Property CTA */}
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-10 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Are You a Builder or Seller?</h2>
            <p className="mb-6">List your properties now and connect with potential buyers instantly.</p>
            <a
              href="/dashboard/seller"
              className="inline-block bg-white text-gray-900 font-medium px-6 py-3 rounded-xl hover:bg-gray-100"
            >
              List Your Property
            </a>
          </div>
        </section>
      </main>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}














// import { UserButton } from "@clerk/nextjs";
// import Footer from "@/components/ui/footer";
// import SearchBar from "@/components/ui/searchbar";

// import PropertyList from "@/components/shared/home-property-card";

// export default function Home() {
//   // const handleSearch = (query: string) => {
//   //   console.log("Searching for:", query);
//   // };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Main Content */}
//       <main className="flex-grow max-w-8xl w-full mx-auto px-4 py-10">
//         {/* Top Bar */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-bold">TheSampleFlat</h1>
//           <UserButton afterSignOutUrl="/" />
//         </div>

//         {/* Search Bar */}
//         <div className="mb-10 flex justify-center">
//           <div className="w-full max-w-4xl">
//             <SearchBar />
//           </div>
//         </div>

//         {/* Optional More Content Here */}
//         <p className="text-gray-700 text-lg text-center">
//           Welcome to TheSampleFlat – find your next property with ease.
//         </p>

//         <div className="flex justify-center">
//           <PropertyList></PropertyList>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="w-full">
//         <Footer />
//       </footer>
//     </div>
//   );
// }
