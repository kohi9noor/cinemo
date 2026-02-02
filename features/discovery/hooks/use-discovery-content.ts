"use client";

import { useState, useEffect, useCallback } from "react";
import { getMixedTrending } from "../actions/tmdb";
import { searchContent, discoverByGenre } from "../actions/search";
import { transformTMDBContent } from "../utils/tmdb-helpers";
import { useInfiniteScroll } from "./use-infinite-scroll";
import { useDebounce } from "./use-debounce";
import type { ContentItem } from "../types/tmdb";
import { toast } from "sonner";
type NormalizedResult = {
  items: ContentItem[];
  hasMore: boolean;
};

const fetchDiscoveryData = async (
  page: number,
  searchQuery: string,
  genre: number | null,
  mediaType: string,
): Promise<NormalizedResult> => {
  let result;

  if (searchQuery.trim()) {
    result = await searchContent(searchQuery, page);
  } else if (genre && mediaType !== "all") {
    result = await discoverByGenre(mediaType as "movie" | "tv", genre, page);
  } else if (genre) {
    const [movie, tv] = await Promise.all([
      discoverByGenre("movie", genre, page),
      discoverByGenre("tv", genre, page),
    ]);

    if (movie.error || tv.error || !movie.data || !tv.data) {
      throw new Error("Failed to load content");
    }

    const combined = [...movie.data.results, ...tv.data.results]
      .sort((a, b) => b.popularity - a.popularity)
      .map(transformTMDBContent);

    return {
      items: combined,
      hasMore: page < Math.max(movie.data.total_pages, tv.data.total_pages),
    };
  } else {
    result = await getMixedTrending(page);
  }

  if (result.error || !result.data) {
    throw new Error("Failed to load content");
  }

  return {
    items: result.data.results.map(transformTMDBContent),
    hasMore: result.data.page < result.data.total_pages,
  };
};

interface UseDiscoveryContentProps {
  searchQuery?: string;
  selectedGenre?: number | null;
  selectedMediaType?: string;
}

export const useDiscoveryContent = ({
  searchQuery = "",
  selectedGenre = null,
  selectedMediaType = "all",
}: UseDiscoveryContentProps = {}) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchContent = useCallback(
    async (pageNum: number, reset = false) => {
      setIsLoading(true);
      try {
        const { items, hasMore } = await fetchDiscoveryData(
          pageNum,
          debouncedSearchQuery,
          selectedGenre,
          selectedMediaType,
        );

        setContent((prev) => (reset ? items : [...prev, ...items]));
        setHasMore(hasMore);
      } catch {
        toast.error("Failed to load content");
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchQuery, selectedGenre, selectedMediaType],
  );

  useEffect(() => {
    setPage(1);
    setContent([]);
    fetchContent(1, true);
  }, [fetchContent]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const next = page + 1;
      setPage(next);
      fetchContent(next);
    }
  }, [page, hasMore, isLoading, fetchContent]);

  const { resetFetching } = useInfiniteScroll(loadMore, hasMore);

  useEffect(() => {
    resetFetching();
  }, [content, resetFetching]);

  return { content, isLoading, hasMore };
};
