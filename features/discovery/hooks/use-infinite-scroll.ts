"use client";

import { useState, useEffect, useCallback } from "react";

export const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 500 &&
      hasMore &&
      !isFetching
    ) {
      setIsFetching(true);
    }
  }, [hasMore, isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching, callback]);

  const resetFetching = () => setIsFetching(false);

  return { isFetching, resetFetching };
};
