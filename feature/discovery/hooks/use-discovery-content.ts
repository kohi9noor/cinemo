"use client";

import { useState, useEffect, useCallback } from "react";
import { getMixedTrending } from "../actions/tmdb";
import { searchContent, discoverByGenre } from "../actions/search";
import { transformTMDBContent } from "../utils/tmdb-helpers";
import { useInfiniteScroll } from "./use-infinite-scroll";
import { useDebounce } from "./use-debounce";
import type { ContentItem } from "../types/tmdb";
import { toast } from "sonner";

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
    async (pageNum: number, isNewQuery: boolean = false) => {
      setIsLoading(true);

      try {
        let result;

        if (debouncedSearchQuery.trim()) {
          result = await searchContent(debouncedSearchQuery, pageNum);
        } else if (selectedGenre && selectedMediaType !== "all") {
          result = await discoverByGenre(
            selectedMediaType as "movie" | "tv",
            selectedGenre,
            pageNum,
          );
        } else if (selectedGenre) {
          const movieResult = await discoverByGenre(
            "movie",
            selectedGenre,
            pageNum,
          );
          const tvResult = await discoverByGenre("tv", selectedGenre, pageNum);

          if (
            movieResult.error ||
            tvResult.error ||
            !movieResult.data ||
            !tvResult.data
          ) {
            toast.error("Failed to load content");
            return;
          }

          const combined = [
            ...movieResult.data.results,
            ...tvResult.data.results,
          ].sort((a, b) => b.popularity - a.popularity);

          const transformedContent = combined.map(transformTMDBContent);
          setContent((prev) =>
            isNewQuery ? transformedContent : [...prev, ...transformedContent],
          );
          setHasMore(
            pageNum <
              Math.max(movieResult.data.total_pages, tvResult.data.total_pages),
          );
          return;
        } else {
          result = await getMixedTrending(pageNum);
        }

        if (result.error) {
          toast.error(result.error.message);
          return;
        }

        if (result.data) {
          const transformedContent =
            result.data.results.map(transformTMDBContent);
          setContent((prev) =>
            isNewQuery ? transformedContent : [...prev, ...transformedContent],
          );
          setHasMore(result.data.page < result.data.total_pages);
        }
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
      const nextPage = page + 1;
      setPage(nextPage);
      fetchContent(nextPage);
    }
  }, [page, hasMore, isLoading, fetchContent]);

  const { resetFetching } = useInfiniteScroll(loadMore, hasMore);

  useEffect(() => {
    resetFetching();
  }, [content, resetFetching]);

  return {
    content,
    isLoading,
    hasMore,
  };
};
