import { ContentCard } from "./content-card";
import type { ContentItem } from "../types/tmdb";

interface ContentGridProps {
  items: ContentItem[];
  onItemClick?: (item: ContentItem) => void;
}

export const ContentGrid = ({ items, onItemClick }: ContentGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
      {items.map((item, index) => (
        <ContentCard
          key={index}
          title={item.title}
          year={item.year}
          rating={item.rating}
          posterUrl={item.posterUrl}
          onClick={() => onItemClick?.(item)}
        />
      ))}
    </div>
  );
};
