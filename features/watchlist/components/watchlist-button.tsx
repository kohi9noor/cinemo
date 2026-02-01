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
        className="flex items-center gap-2 px-4 py-2 text-sm bg-muted-background border border-default rounded-lg text-muted"
      >
        <div className="w-4 h-4 border-2 border-border border-t-border-hover rounded-full animate-spin" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleWatchlist}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-all ${
        isInWatchlist
          ? "bg-accent/20 border-accent text-primary hover:bg-accent/30"
          : "bg-muted-background border-default text-secondary hover:bg-background-card hover:border-hover"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-border border-t-accent rounded-full animate-spin" />
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
