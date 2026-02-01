"use client";

import { useState, useEffect } from "react";

import {
  getMovieDetails,
  getTVDetails,
  getMovieCredits,
  getTVCredits,
  getMovieVideos,
  getTVVideos,
} from "../actions/tmdb";

import type {
  TMDBMovieDetail,
  TMDBTVDetail,
  Credits,
  Video,
} from "../types/tmdb";

import { toast } from "sonner";

export const useContentDetails = (id: number, mediaType: "movie" | "tv") => {
  const [details, setDetails] = useState<TMDBMovieDetail | TMDBTVDetail | null>(
    null,
  );

  const [credits, setCredits] = useState<Credits | null>(null);

  const [videos, setVideos] = useState<Video[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);

      try {
        const detailsResult =
          mediaType === "movie"
            ? await getMovieDetails(id)
            : await getTVDetails(id);

        if (detailsResult.error) {
          toast.error(detailsResult.error.message);
          return;
        }

        setDetails(detailsResult.data);

        const creditsResult =
          mediaType === "movie"
            ? await getMovieCredits(id)
            : await getTVCredits(id);

        if (!creditsResult.error && creditsResult.data) {
          setCredits(creditsResult.data);
        }

        const videosResult =
          mediaType === "movie"
            ? await getMovieVideos(id)
            : await getTVVideos(id);

        if (!videosResult.error && videosResult.data) {
          setVideos(videosResult.data.results);
        }
      } catch {
        toast.error("Failed to load content details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, mediaType]);

  return {
    details,
    credits,
    videos,
    isLoading,
  };
};
