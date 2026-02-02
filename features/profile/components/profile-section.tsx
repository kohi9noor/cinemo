"use client";

import { User } from "@supabase/supabase-js";
import { WatchlistGrid } from "@/features/watchlist/components/watchlist-grid";
import Image from "next/image";
import { useMemo } from "react";
import { getRandomLightColor, colorToGradient } from "@/lib/color-utils";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/features/auth/components/button";

interface ProfileSectionProps {
  user: User;
}

export const ProfileSection = ({ user }: ProfileSectionProps) => {
  const router = useRouter();
  const borderColor = useMemo(
    () => getRandomLightColor(user.email || ""),
    [user.email],
  );

  const gradientBg = useMemo(() => colorToGradient(borderColor), [borderColor]);

  const avatarUrl = user.user_metadata?.avatar_url;
  const emailInitials = user.email?.slice(0, 2).toUpperCase() || "U";

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div
        className="relative h-[30vh] border-b border-default"
        style={{
          background: gradientBg,
        }}
      >
        <div className="max-w-7xl mx-auto px-8 h-full flex items-end pb-8">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-6">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={user.email || "Profile Avatar"}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover"
                  style={{
                    border: `3px solid ${borderColor}`,
                  }}
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-primary"
                  style={{
                    border: `3px solid ${borderColor}`,
                    backgroundColor: `${borderColor}20`,
                  }}
                >
                  {emailInitials}
                </div>
              )}

              <div>
                <h1 className="text-primary text-4xl font-bold mb-2">
                  {user.email?.split("@")[0]}
                </h1>
                <p className="text-muted text-sm">{user.email}</p>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="ghost"
              icon={LogOut}
              className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2 text-primary text-2xl font-semibold">
            <span>My Watchlist</span>
          </div>
        </div>

        <WatchlistGrid />
      </div>
    </div>
  );
};
