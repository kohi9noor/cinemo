"use client";

import { Filter, Check } from "lucide-react";
import { useState } from "react";

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

const MEDIA_TYPES = [
  { id: "all", name: "All" },
  { id: "movie", name: "Movies" },
  { id: "tv", name: "TV Shows" },
];

interface FiltersPanelProps {
  selectedGenre: number | null;
  selectedMediaType: string;
  onGenreChange: (genreId: number | null) => void;
  onMediaTypeChange: (type: string) => void;
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
        className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-white text-sm transition-all"
      >
        <Filter className="w-4 h-4" />
        Filters
        {(selectedGenre || selectedMediaType !== "all") && (
          <span className="w-2 h-2 bg-white rounded-full" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 max-h-[70vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-20">
            <div className="p-4 space-y-6">
              <div>
                <h3 className="text-white text-sm font-semibold mb-3">Type</h3>
                <div className="flex gap-2">
                  {MEDIA_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => onMediaTypeChange(type.id)}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs transition-all border ${
                        selectedMediaType === type.id
                          ? "bg-white/20 border-white/40 text-white"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white text-sm font-semibold">Genres</h3>
                  {selectedGenre && (
                    <button
                      onClick={() => onGenreChange(null)}
                      className="text-white/50 hover:text-white text-xs"
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
                            ? "bg-white/20 border-white/40 text-white"
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
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
