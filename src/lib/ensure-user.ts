import { auth } from "@clerk/nextjs/server"; // ✅ Server-safe import
import { prisma } from "@/lib/prisma";

// Use the REST API instead of client SDK to fetch Clerk user
export async function ensureUser() {
  const { userId } = await auth();
  if (!userId) return null;

  // Check if user already exists in your DB
  const existingUser = await prisma.user.findUnique({ where: { id: userId } });
  if (existingUser) return existingUser;

  // Instead of clerkClient (which doesn't work in RSC), fetch user from Clerk API
  const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY!}`,
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch Clerk user");
    return null;
  }

  const clerkUser = await response.json();
  const email = clerkUser.email_addresses?.[0]?.email_address || "";

  // Create user in DB
//   const newUser = await prisma.user.create({
//   data: {
//     clerkId: userId,              // Clerk ID
//     email,
//     name: clerkUser.first_name || "",
//     image: clerkUser.image_url,
//     role: "BUYER",
//   },
// });


 // return newUser;
}
