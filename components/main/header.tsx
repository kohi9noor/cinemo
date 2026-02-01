"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import LazyLoader from "../ui/lazy-loader";
import ProfileIcon from "./profile-icon";

export const Header = () => {
  const router = useRouter();
  const { profile, isLoading, isAuth } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md ">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-primary">Cinemo</h1>
        </div>

        {isLoading ? (
          <LazyLoader />
        ) : (
          isAuth &&
          profile && (
            <ProfileIcon
              avatarUrl={profile.avatarUrl}
              initials={profile.initials}
              fullName={profile.fullName}
              email={profile.email}
              onClick={() => router.push("/profile")}
            />
          )
        )}
      </div>
    </header>
  );
};
