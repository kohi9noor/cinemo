"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useWatchlist } from "../hooks/use-watchlist";

interface WatchlistButtonProps {
  contentId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath?: string | null;
  releaseDate?: string;
  rating?: string;
}

export const WatchlistButton = ({
  contentId,
  mediaType,
  title,
  posterPath,
  releaseDate,
  rating,
}: WatchlistButtonProps) => {
  const { isInWatchlist, isLoading, isChecking, toggleWatchlist } =
    useWatchlist({
      contentId,
      mediaType,
      title,
      posterPath,
      releaseDate,
      rating,
    });

  if (isChecking) {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white/40"
      >
        <div className="w-4 h-4 border-2 border-white/20 border-t-white/40 rounded-full animate-spin" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleWatchlist}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-all ${
        isInWatchlist
          ? "bg-white/20 border-white/40 text-white hover:bg-white/25"
          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
      ) : isInWatchlist ? (
        <>
          <BookmarkCheck className="w-4 h-4" />
          In Watchlist
        </>
      ) : (
        <>
          <Bookmark className="w-4 h-4" />
          Add to Watchlist
        </>
      )}
    </button>
  );
};
