import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const { userId } = await auth();

  // Optional: protect this page with your admin ID
  // if (userId !== "your_admin_clerk_user_id") redirect("/");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">👥 All Users</h2>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{user.email || "No Email"}</p>
              <p className="text-sm text-gray-600">ID: {user.id}</p>
              <p className="text-sm text-gray-500">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Optional: Add delete/restrict buttons later */}
          </div>
        ))}
      </div>
    </div>
  );
}
