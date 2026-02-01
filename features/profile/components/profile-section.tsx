"use client";

import { User } from "@supabase/supabase-js";
import { WatchlistGrid } from "@/features/watchlist/components/watchlist-grid";

interface ProfileSectionProps {
  user: User;
}

export const ProfileSection = ({ user }: ProfileSectionProps) => {
  return (
    <div className="min-h-screen w-full">
      <div className="relative h-[30vh] bg-linear-to-b from-white/5 to-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 h-full flex items-end pb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-white text-3xl font-bold">
              {user.email?.[0].toUpperCase()}
            </div>

            <div>
              <h1 className="text-white text-4xl font-bold mb-2">
                {user.email?.split("@")[0]}
              </h1>
              <p className="text-white/60 text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2 text-white text-2xl font-semibold">
            <span>My Watchlist</span>
          </div>
        </div>

        <WatchlistGrid />
      </div>
    </div>
  );
};
