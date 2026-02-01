"use client";

import { useRouter } from "next/navigation";
import { useWatchlistData } from "../hooks/use-watchlist-data";
import { WatchlistCard } from "./watchlist-card";

export const WatchlistGrid = () => {
  const router = useRouter();
  const { watchlist, isLoading, removeItem } = useWatchlistData();

  const handleCardClick = (contentId: number, mediaType: string) => {
    router.push(`/detail/${mediaType}/${contentId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">📺</span>
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">
          Your watchlist is empty
        </h3>
        <p className="text-white/60 text-sm">
          Start adding movies and TV shows to watch later
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {watchlist.map((item) => (
        <WatchlistCard
          key={`${item.contentId}-${item.mediaType}`}
          item={item}
          onRemove={removeItem}
          onClick={() => handleCardClick(item.contentId, item.mediaType)}
        />
      ))}
    </div>
  );
};
