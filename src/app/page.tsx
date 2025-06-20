import { UserButton } from "@clerk/nextjs";
import Footer from "@/components/ui/footer";
import SearchBar from "@/components/ui/searchbar";

import PropertyList from "@/components/shared/home-property-card";

export default function Home() {
  // const handleSearch = (query: string) => {
  //   console.log("Searching for:", query);
  // };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow max-w-8xl w-full mx-auto px-4 py-10">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">TheSampleFlat</h1>
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Search Bar */}
        <div className="mb-10 flex justify-center">
          <div className="w-full max-w-4xl">
            <SearchBar />
          </div>
        </div>

        {/* Optional More Content Here */}
        <p className="text-gray-700 text-lg text-center">
          Welcome to TheSampleFlat – find your next property with ease.
        </p>

        <div className="flex justify-center">
          <PropertyList></PropertyList>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}
