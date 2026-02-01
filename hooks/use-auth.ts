import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const transform = (user: User | null) => {
    if (!user) return null;

    const getInitials = (email: string) => {
      return email
        .split("@")[0]
        .split("")
        .slice(0, 2)
        .map((c) => c.toUpperCase())
        .join("");
    };

    const avatarUrl = user?.user_metadata?.avatar_url;
    const email = user?.email || "";
    const fullName = user?.user_metadata?.full_name || email;
    const initials = getInitials(email);

    return { avatarUrl, email, fullName, initials };
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return {
    profile: transform(user),
    user,
    isLoading,
    isAuth: !!user,
    transform,
  };
};

export default useAuth;
