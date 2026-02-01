"use client";

import { ContentGrid } from "./content-grid";
import { useDiscoveryContent } from "../hooks/use-discovery-content";
import type { ContentItem } from "../types/tmdb";

export const DiscoverySection = () => {
  const { content, isLoading, hasMore } = useDiscoveryContent();

  const handleItemClick = (item: ContentItem) => {
    console.log("Content clicked:", item);
  };

  return (
    <section className="max-w-7xl px-4 mx-auto w-full h-full py-12">
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
    </section>
  );
};
