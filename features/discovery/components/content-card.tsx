import Image from "next/image";
import { X } from "lucide-react";
import React from "react";
interface ContentCardProps {
  title: string;
  year?: string | number;
  rating?: number;
  posterUrl: string;
  onClick?: () => void;
  isRemoveWatchList?: boolean;
  removeWatchList?: (e: React.MouseEvent) => void;
}

export const ContentCard = ({
  title,
  year,
  rating,
  posterUrl,
  onClick,
  removeWatchList,
  isRemoveWatchList,
}: ContentCardProps) => {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="aspect-3/4 bg-white/5 rounded-md relative overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02]">
        <Image
          width={400}
          height={400}
          src={posterUrl}
          alt={`${title} poster`}
          className="w-full h-full object-cover"
        />

        {isRemoveWatchList && removeWatchList && (
          <button
            onClick={removeWatchList}
            className="absolute top-2 right-2 p-2 bg-black/80 hover:bg-red-600 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      <div className="mt-2 space-y-0.5">
        <h3 className="text-xs font-medium text-foreground truncate">
          {title}
        </h3>
        {(year || rating) && (
          <p className="text-xs text-white/50">
            {year && <span>{year}</span>}
            {year && rating && <span> • </span>}
            {rating && <span>⭐ {rating}</span>}
          </p>
        )}
      </div>
    </div>
  );
};
