"use client";

import { useState, useEffect } from "react";
import { getUserWatchlist, removeFromWatchlist } from "../actions/watchlist";
import type { WatchlistItem } from "@/db/schema";
import { toast } from "sonner";

export const useWatchlistData = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWatchlist = async () => {
    setIsLoading(true);
    const result = await getUserWatchlist();
    if (result.data) {
      setWatchlist(result.data);
    } else if (result.error) {
      toast.error(result.error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    const loadWatchlist = async () => {
      setIsLoading(true);
      const result = await getUserWatchlist();
      if (mounted) {
        if (result.data) {
          setWatchlist(result.data);
        } else if (result.error) {
          toast.error(result.error.message);
        }
        setIsLoading(false);
      }
    };

    loadWatchlist();

    return () => {
      mounted = false;
    };
  }, []);

  const removeItem = async (contentId: number, mediaType: "movie" | "tv") => {
    const result = await removeFromWatchlist(contentId, mediaType);
    if (result.error) {
      toast.error(result.error.message);
    } else {
      setWatchlist((prev) =>
        prev.filter(
          (item) =>
            !(item.contentId === contentId && item.mediaType === mediaType),
        ),
      );
      toast.success("Removed from watchlist");
    }
  };

  return {
    watchlist,
    isLoading,
    removeItem,
    refetch: fetchWatchlist,
  };
};
