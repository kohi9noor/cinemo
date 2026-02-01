import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileSection } from "@/features/profile/components/profile-section";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth?redirect=/profile");
  }

  return (
    <div className="min-h-screen w-full">
      <ProfileSection user={session.user} />
    </div>
  );
}
