"use server";

import { ok, err } from "@/lib/utils";
import type { TMDBResponse, TMDBContent } from "../types/tmdb";
import { tmdbFetch } from "@/lib/tmdb";

export async function searchContent(query: string, page: number = 1) {
  try {
    const data = await tmdbFetch<TMDBResponse<TMDBContent>>(
      `/search/multi?query=${encodeURIComponent(query)}&page=${page}`,
    );
    return ok(data);
  } catch {
    return err(new Error("Failed to search content"));
  }
}

export async function discoverByGenre(
  mediaType: "movie" | "tv",
  genreId: number,
  page: number = 1,
) {
  try {
    const data = await tmdbFetch<TMDBResponse<TMDBContent>>(
      `/${mediaType === "movie" ? "discover/movie" : "discover/tv"}?with_genres=${genreId}&page=${page}`,
    );
    return ok(data);
  } catch {
    return err(new Error("Failed to discover content by genre"));
  }
}
