"use client";

import { useOnboarding } from "../hooks/use-onboarding";
import { OnboardingHeader } from "./onboarding/onboarding-header";
import { GenreGrid } from "./onboarding/genre-grid";
import { OnboardingActions } from "./onboarding/onboarding-actions";

interface OnboardingCardProps {
  onComplete: (preferences: {
    favoriteMovieGenres: string[];
    favoriteTvGenres: string[];
  }) => void;
}

const OnboardingCard = ({ onComplete }: OnboardingCardProps) => {
  const {
    step,
    movieGenres,
    tvGenres,
    isLoading,
    toggleMovieGenre,
    toggleTvGenre,
    handleNext,
    handleComplete,
    MOVIE_GENRES,
    TV_GENRES,
  } = useOnboarding(onComplete);

  const currentGenres = step === "movie" ? MOVIE_GENRES : TV_GENRES;
  const selectedGenres = step === "movie" ? movieGenres : tvGenres;
  const toggleGenre = step === "movie" ? toggleMovieGenre : toggleTvGenre;

  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto">
      <OnboardingHeader step={step} />

      <GenreGrid
        genres={currentGenres}
        selectedGenres={selectedGenres}
        onToggle={toggleGenre}
      />

      <OnboardingActions
        step={step}
        selectedCount={selectedGenres.length}
        isLoading={isLoading}
        onNext={handleNext}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default OnboardingCard;
