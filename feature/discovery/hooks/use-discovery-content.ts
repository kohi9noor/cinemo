"use client";

import { useState, useEffect, useCallback } from "react";
import { getMixedTrending } from "../actions/tmdb";
import { transformTMDBContent } from "../utils/tmdb-helpers";
import { useInfiniteScroll } from "./use-infinite-scroll";
import type { ContentItem } from "../types/tmdb";
import { toast } from "sonner";

export const useDiscoveryContent = () => {
  const [content, setContent] = useState<ContentItem[]>([]);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const fetchContent = useCallback(async (pageNum: number) => {
    setIsLoading(true);

    try {
      const { data, error } = await getMixedTrending(pageNum);

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        const transformedContent = data.results.map(transformTMDBContent);
        setContent((prev) => [...prev, ...transformedContent]);
        setHasMore(data.page < data.total_pages);
      }
    } catch {
      toast.error("Failed to load content");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent(1);
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
