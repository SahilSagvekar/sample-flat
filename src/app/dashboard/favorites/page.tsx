// app/dashboard/buyer/favorites/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/shared/property-card";
import Link from "next/link";

export default async function FavoritesPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-600">Please sign in to view your saved listings.</p>
        <Link href="/sign-in">
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
            Sign In
          </button>
        </Link>
      </div>
    );
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      property: {
        include: { seller: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-600">You haven't saved any listings yet.</p>
        <Link href="/dashboard/buyer">
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
            Browse Properties
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">💖 Saved Listings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((fav) => (
          <div key={fav.id} className="relative">
            <PropertyCard property={fav.property} currentUserId={userId} />

            <form
              action={`/api/favorite/${fav.property.id}`}
              method="POST"
              className="absolute top-2 right-2"
            >
              <button
                type="submit"
                className="bg-white border border-gray-300 text-red-600 text-sm px-3 py-1 rounded hover:bg-red-50"
              >
                💔 Remove
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
