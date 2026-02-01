import { ContentCard } from "./content-card";

interface Content {
  id: string | number;
  title: string;
  year?: string | number;
  rating?: number;
  posterUrl: string;
}

interface ContentGridProps {
  items: Content[];
  onItemClick?: (item: Content) => void;
}

export const ContentGrid = ({ items, onItemClick }: ContentGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
      {items.map((item) => (
        <ContentCard
          key={item.id}
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
