"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { WatchlistItem } from "@/db/schema";

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
  const getPosterUrl = (path: string | null) => {
    if (!path) return "/placeholder-poster.jpg";
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(item.contentId, item.mediaType as "movie" | "tv");
  };

  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      <div className="aspect-[2/3] relative rounded-lg overflow-hidden border border-white/10 bg-white/5">
        <img
          src={getPosterUrl(item.posterPath)}
          alt={item.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 p-2 bg-black/80 hover:bg-red-600 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
              {item.title}
            </h3>
            {item.releaseDate && (
              <p className="text-white/60 text-xs">
                {new Date(item.releaseDate).getFullYear()}
              </p>
            )}
            {item.rating && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-white/80 text-xs">{item.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
