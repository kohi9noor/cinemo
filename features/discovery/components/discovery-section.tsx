"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContentGrid } from "./content-grid";
import { SearchBar } from "./search-bar";
import { FiltersPanel } from "./filters-panel";
import { useDiscoveryContent } from "../hooks/use-discovery-content";
import type { ContentItem, MediaType } from "../types/tmdb";

export const DiscoverySection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const [selectedMediaType, setSelectedMediaType] = useState<
    "all" | "movie" | "tv"
  >("all");

  const { content, isLoading, hasMore } = useDiscoveryContent({
    searchQuery,
    selectedGenre,
    selectedMediaType,
  });

  const handleItemClick = (item: ContentItem) => {
    router.push(`/detail/${item.mediaType}/${item.id}`);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleMediaTypeChange = (type: MediaType) => {
    setSelectedMediaType(type);
  };

  return (
    <section className="max-w-7xl px-4 mx-auto w-full h-full py-12">
      <div className="flex gap-3 mb-8">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={handleClearSearch}
          />
        </div>
        <FiltersPanel
          selectedGenre={selectedGenre}
          selectedMediaType={selectedMediaType}
          onGenreChange={setSelectedGenre}
          onMediaTypeChange={handleMediaTypeChange}
        />
      </div>

      <ContentGrid items={content} onItemClick={handleItemClick} />

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}

      {!hasMore && content.length > 0 && (
        <p className="text-center text-white/40 text-sm py-8">
          No more content to load
        </p>
      )}

      {!isLoading && content.length === 0 && (
        <p className="text-center text-white/40 text-sm py-8">
          No content found
        </p>
      )}
    </section>
  );
};
