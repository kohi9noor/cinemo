"use client";

import { useState } from "react";

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

export const useOnboarding = (
  onComplete: (preferences: {
    favoriteMovieGenres: string[];
    favoriteTvGenres: string[];
  }) => void,
) => {
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

  return {
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
  };
};
