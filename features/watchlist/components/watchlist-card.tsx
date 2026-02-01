"use client";

import type { WatchlistItem } from "@/db/schema";
import { ContentCard } from "@/features/discovery/components";
import { getPosterUrl } from "@/features/discovery/utils/tmdb-helpers";

interface WatchlistCardProps {
  item: WatchlistItem;
  onRemove: (contentId: number, mediaType: "movie" | "tv") => void;
  onClick: () => void;
}

export const WatchlistCard = ({
  item,
  onRemove,
  onClick,
}: WatchlistCardProps) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(item.contentId, item.mediaType as "movie" | "tv");
  };

  const posterUrl = getPosterUrl(item.posterPath);

  return (
    <ContentCard
      onClick={onClick}
      title={item.title}
      posterUrl={posterUrl || ""}
      year={new Date(item.releaseDate || "").getFullYear()}
      rating={Number(item.rating) || undefined}
      isRemoveWatchList={true}
      removeWatchList={handleRemove}
    />
  );
};
