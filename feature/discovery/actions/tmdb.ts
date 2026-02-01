"use server";

import { ok, err } from "@/lib/utils";
import type {
  TMDBResponse,
  TMDBMovie,
  TMDBTVShow,
  TMDBContent,
} from "../types/tmdb";
import { tmdbFetch } from "@/lib/tmdb";

export async function getTrendingMovies(page: number = 1) {
  try {
    const data = await tmdbFetch<TMDBResponse<TMDBMovie>>(
      `/trending/movie/week?page=${page}`,
    );
    return ok(data);
  } catch {
    return err(new Error("Failed to fetch trending movies"));
  }
}

export async function getTrendingTV(page: number = 1) {
  try {
    const data = await tmdbFetch<TMDBResponse<TMDBTVShow>>(
      `/trending/tv/week?page=${page}`,
    );
    return ok(data);
  } catch {
    return err(new Error("Failed to fetch trending TV shows"));
  }
}

export async function getPopularMovies(page: number = 1) {
  try {
    const data = await tmdbFetch<TMDBResponse<TMDBMovie>>(
      `/movie/popular?page=${page}`,
    );
    return ok(data);
  } catch {
    return err(new Error("Failed to fetch popular movies"));
  }
}

export async function getPopularTV(page: number = 1) {
  try {
    const data = await tmdbFetch<TMDBResponse<TMDBTVShow>>(
      `/tv/popular?page=${page}`,
    );
    return ok(data);
  } catch {
    return err(new Error("Failed to fetch popular TV shows"));
  }
}

export async function getMixedTrending(page: number = 1) {
  try {
    const data = await tmdbFetch<TMDBResponse<TMDBContent>>(
      `/trending/all/week?page=${page}`,
    );
    return ok(data);
  } catch {
    return err(new Error("Failed to fetch trending content"));
  }
}

export async function getDiscoverMovies(page: number = 1) {
  try {
    const data = await tmdbFetch<TMDBResponse<TMDBMovie>>(
      `/discover/movie?sort_by=popularity.desc&page=${page}`,
    );
    return ok(data);
  } catch {
    return err(new Error("Failed to discover movies"));
  }
}

export async function getDiscoverTV(page: number = 1) {
  try {
    const data = await tmdbFetch<TMDBResponse<TMDBTVShow>>(
      `/discover/tv?sort_by=popularity.desc&page=${page}`,
    );
    return ok(data);
  } catch {
    return err(new Error("Failed to discover TV shows"));
  }
}
