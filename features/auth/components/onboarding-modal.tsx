"use client";

import { useOnboardingStatus } from "../hooks/use-onboarding-status";
import OnboardingCard from "./onboarding-card";
import AuthCardLayout from "./card-layout";
import {
  updateUserPreferences,
  createUserProfile,
  getUserProfile,
} from "../actions/profile";
import { toast } from "sonner";

const OnboardingModal = () => {
  const { needsOnboarding, isLoading, userId } = useOnboardingStatus();

  const handleComplete = async (preferences: {
    favoriteMovieGenres: string[];
    favoriteTvGenres: string[];
  }) => {
    if (!userId) return;

    try {
      const { data: existingProfile } = await getUserProfile(userId);

      if (!existingProfile) {
        await createUserProfile(userId);
      }

      const { error } = await updateUserPreferences(userId, preferences);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(
          "Preferences saved! Enjoy your personalized experience 🎬",
        );

        window.location.reload();
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return null;

  return (
    needsOnboarding && (
      <AuthCardLayout>
        <OnboardingCard onComplete={handleComplete} />
      </AuthCardLayout>
    )
  );
};

export default OnboardingModal;
