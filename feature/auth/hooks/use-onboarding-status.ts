"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getUserProfile } from "../actions/profile";

export const useOnboardingStatus = () => {
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUserId(user.id);

          const { data: profile } = await getUserProfile(user.id);

          if (!profile) {
            setNeedsOnboarding(true);
          } else if (!profile.onboardingCompleted) {
            setNeedsOnboarding(true);
          } else {
            setNeedsOnboarding(false);
          }
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          checkOnboardingStatus();
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { needsOnboarding, isLoading, userId };
};
