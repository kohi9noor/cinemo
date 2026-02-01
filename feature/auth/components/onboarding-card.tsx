"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "./button";

interface OnboardingCardProps {
  onComplete: (preferences: {
    favoriteMovieGenres: string[];
    favoriteTvGenres: string[];
  }) => void;
}

const MOVIE_GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
];

const TV_GENRES = [
  "Action & Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Kids",
  "Mystery",
  "News",
  "Reality",
  "Sci-Fi & Fantasy",
  "Soap",
  "Talk",
  "War & Politics",
  "Western",
];

const OnboardingCard = ({ onComplete }: OnboardingCardProps) => {
  const [step, setStep] = useState<"movie" | "tv">("movie");
  const [movieGenres, setMovieGenres] = useState<string[]>([]);
  const [tvGenres, setTvGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMovieGenre = (genre: string) => {
    setMovieGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const toggleTvGenre = (genre: string) => {
    setTvGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const handleNext = () => {
    if (step === "movie") {
      setStep("tv");
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    await onComplete({
      favoriteMovieGenres: movieGenres,
      favoriteTvGenres: tvGenres,
    });
    setIsLoading(false);
  };

  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">
          {step === "movie"
            ? "Pick Your Favorite Movie Genres"
            : "Pick Your Favorite TV Genres"}
        </h2>
        <p className="text-white/50 text-xs">
          {step === "movie"
            ? "Select at least 3 genres you love"
            : "Select at least 3 genres you enjoy"}
        </p>
        <div className="flex gap-2 justify-center mt-3">
          <div
            className={`h-1.5 w-8 rounded-full ${
              step === "movie" ? "bg-white/80" : "bg-white/20"
            }`}
          />
          <div
            className={`h-1.5 w-8 rounded-full ${
              step === "tv" ? "bg-white/80" : "bg-white/20"
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {(step === "movie" ? MOVIE_GENRES : TV_GENRES).map((genre) => {
          const isSelected =
            step === "movie"
              ? movieGenres.includes(genre)
              : tvGenres.includes(genre);
          return (
            <button
              key={genre}
              onClick={() =>
                step === "movie"
                  ? toggleMovieGenre(genre)
                  : toggleTvGenre(genre)
              }
              className={`px-3 py-2 rounded-lg text-sm transition-all border ${
                isSelected
                  ? "bg-white/20 border-white/40 text-white"
                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
              }`}
            >
              <span className="flex items-center justify-center gap-1.5">
                {isSelected && <Check className="w-3 h-3" />}
                {genre}
              </span>
            </button>
          );
        })}
      </div>

      {step === "movie" ? (
        <Button
          variant="primary"
          fullWidth
          onClick={handleNext}
          disabled={movieGenres.length < 3}
        >
          Continue to TV Genres
        </Button>
      ) : (
        <Button
          variant="primary"
          fullWidth
          onClick={handleComplete}
          disabled={tvGenres.length < 3 || isLoading}
        >
          {isLoading ? "Saving preferences..." : "Complete Setup"}
        </Button>
      )}

      {step === "movie" && movieGenres.length < 3 && (
        <p className="text-white/40 text-xs text-center mt-2">
          Select {3 - movieGenres.length} more to continue
        </p>
      )}
      {step === "tv" && tvGenres.length < 3 && (
        <p className="text-white/40 text-xs text-center mt-2">
          Select {3 - tvGenres.length} more to continue
        </p>
      )}
    </div>
  );
};

export default OnboardingCard;
