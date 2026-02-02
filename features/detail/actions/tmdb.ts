"use server";

import { ok, err } from "@/lib/utils";
import type {
  TMDBMovieDetail,
  TMDBTVDetail,
  Credits,
  VideosResponse,
} from "../types/tmdb";
import { tmdbFetch } from "@/lib/tmdb";

export async function getMovieDetails(movieId: number) {
  try {
    const data = await tmdbFetch<TMDBMovieDetail>(`/movie/${movieId}`);
    return ok(data);
  } catch {
    return err(new Error("Failed to fetch movie details"));
  }
}

export async function getTVDetails(tvId: number) {
  try {
    const data = await tmdbFetch<TMDBTVDetail>(`/tv/${tvId}`);
    return ok(data);
  } catch {
    return err(new Error("Failed to fetch TV show details"));
  }
}

export async function getMovieCredits(movieId: number) {
  try {
    const data = await tmdbFetch<Credits>(`/movie/${movieId}/credits`);
    return ok(data);
  } catch {
    return err(new Error("Failed to fetch movie credits"));
  }
}

export async function getTVCredits(tvId: number) {
  try {
    const data = await tmdbFetch<Credits>(`/tv/${tvId}/credits`);
    return ok(data);
  } catch {
    return err(new Error("Failed to fetch TV show credits"));
  }
}

export async function getMovieVideos(movieId: number) {
  try {
    const data = await tmdbFetch<VideosResponse>(`/movie/${movieId}/videos`);
    return ok(data);
  } catch {
    return err(new Error("Failed to fetch movie videos"));
  }
}

export async function getTVVideos(tvId: number) {
  try {
    const data = await tmdbFetch<VideosResponse>(`/tv/${tvId}/videos`);
    return ok(data);
  } catch {
    return err(new Error("Failed to fetch TV show videos"));
  }
}
