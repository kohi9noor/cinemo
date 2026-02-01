"use client";

import { ContentGrid } from "./content-grid";

const MOCK_CONTENT = Array.from({ length: 20 }).map((_, index) => ({
  id: index,
  title: "The Silent Echo",
  year: "2024",
  rating: 8.2,
  posterUrl:
    "https://m.media-amazon.com/images/M/MV5BZWVjYjIzMWYtNjcwOS00NTBhLWE2YTctYWJmMDhjZmU3NjVkXkEyXkFqcGc@._V1_FMjpg_UY2000_.jpg",
}));

export const DiscoverySection = () => {
  const handleItemClick = (item: unknown) => {
    console.log("Content clicked:", item);
  };

  return (
    <section className="max-w-7xl px-4 mx-auto w-full h-full">
      <ContentGrid items={MOCK_CONTENT} onItemClick={handleItemClick} />
    </section>
  );
};
