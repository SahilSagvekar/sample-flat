import { ensureUser } from "@/lib/ensure-user";
import { UserProfileForm } from "@/components/forms/user-profile-form";

export default async function ProfilePage() {
  const user = await ensureUser();
  if (!user) return <p>Not authenticated.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <UserProfileForm user={user} />
    </div>
  );
}
