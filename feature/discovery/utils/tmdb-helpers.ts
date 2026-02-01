import type { TMDBContent, ContentItem } from "../types/tmdb";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const transformTMDBContent = (content: TMDBContent): ContentItem => {
  const isMovie = "title" in content;

  return {
    id: content.id,
    title: isMovie ? content.title : content.name,
    year: isMovie
      ? content.release_date?.split("-")[0] || "N/A"
      : content.first_air_date?.split("-")[0] || "N/A",
    rating: Math.round(content.vote_average * 10) / 10,
    posterUrl: content.poster_path
      ? `${TMDB_IMAGE_BASE}${content.poster_path}`
      : "/placeholder-poster.jpg",
    mediaType: isMovie ? "movie" : "tv",
  };
};

export const getPosterUrl = (
  path: string | null,
  size: "w500" | "original" = "w500",
) => {
  if (!path) return "/placeholder-poster.jpg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getBackdropUrl = (
  path: string | null,
  size: "w1280" | "original" = "w1280",
) => {
  if (!path) return "/placeholder-backdrop.jpg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
