"use client";

import { Filter, Check } from "lucide-react";
import { useState } from "react";
import { MediaType } from "@/features/discovery/types/tmdb";

export const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
];

const MEDIA_TYPES: { id: MediaType; name: string }[] = [
  { id: "all", name: "All" },
  { id: "movie", name: "Movies" },
  { id: "tv", name: "TV Shows" },
];

interface FiltersPanelProps {
  selectedGenre: number | null;
  selectedMediaType: MediaType;
  onGenreChange: (genreId: number | null) => void;
  onMediaTypeChange: (type: MediaType) => void;
}

export const FiltersPanel = ({
  selectedGenre,
  selectedMediaType,
  onGenreChange,
  onMediaTypeChange,
}: FiltersPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-background-card hover:bg-background-glass border border-default hover:border-hover rounded-lg text-primary text-sm transition-all"
      >
        <Filter className="w-4 h-4" />
        Filters
        {(selectedGenre || selectedMediaType !== "all") && (
          <span className="w-2 h-2 bg-accent rounded-full" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 max-h-[70vh] overflow-y-auto bg-background-glass backdrop-blur-xl border border-default rounded-lg shadow-xl z-20">
            <div className="p-4 space-y-6">
              <div>
                <h3 className="text-primary text-sm font-semibold mb-3">
                  Type
                </h3>
                <div className="flex gap-2">
                  {MEDIA_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => onMediaTypeChange(type.id)}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs transition-all border ${
                        selectedMediaType === type.id
                          ? "bg-accent/20 border-accent text-primary font-medium"
                          : "bg-muted-background border-default text-secondary hover:bg-background-card"
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-primary text-sm font-semibold">Genres</h3>
                  {selectedGenre && (
                    <button
                      onClick={() => onGenreChange(null)}
                      className="text-muted hover:text-primary text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {GENRES.map((genre) => {
                    const isSelected = selectedGenre === genre.id;
                    return (
                      <button
                        key={genre.id}
                        onClick={() =>
                          onGenreChange(isSelected ? null : genre.id)
                        }
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all border ${
                          isSelected
                            ? "bg-accent/20 border-accent text-primary font-medium"
                            : "bg-muted-background border-default text-secondary hover:bg-background-card"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        {genre.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
