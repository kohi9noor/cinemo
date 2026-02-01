"use client";

import { useState, useEffect } from "react";
import {
  addToWatchlist,
  removeFromWatchlist,
  checkInWatchlist,
} from "../actions/watchlist";
import { toast } from "sonner";

interface UseWatchlistParams {
  contentId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath?: string | null;
  releaseDate?: string;
  rating?: string;
}

export const useWatchlist = ({
  contentId,
  mediaType,
  title,
  posterPath,
  releaseDate,
  rating,
}: UseWatchlistParams) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkStatus = async () => {
      const result = await checkInWatchlist(contentId, mediaType);
      if (mounted && result.data !== null) {
        setIsInWatchlist(result.data);
        setIsChecking(false);
      }
    };

    checkStatus();

    return () => {
      mounted = false;
    };
  }, [contentId, mediaType]);

  const toggleWatchlist = async () => {
    setIsLoading(true);

    try {
      if (isInWatchlist) {
        const result = await removeFromWatchlist(contentId, mediaType);
        if (result.error) {
          toast.error(result.error.message);
        } else {
          setIsInWatchlist(false);
          toast.success("Removed from watchlist");
        }
      } else {
        const result = await addToWatchlist({
          contentId,
          mediaType,
          title,
          posterPath,
          releaseDate,
          rating,
        });
        if (result.error) {
          toast.error(result.error.message);
        } else {
          setIsInWatchlist(true);
          toast.success("Added to watchlist");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInWatchlist,
    isLoading,
    isChecking,
    toggleWatchlist,
  };
};
