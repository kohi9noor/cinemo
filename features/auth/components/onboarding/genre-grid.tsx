import { GenreButton } from "./genre-button";

interface GenreGridProps {
  genres: string[];
  selectedGenres: string[];
  onToggle: (genre: string) => void;
}

export const GenreGrid = ({
  genres,
  selectedGenres,
  onToggle,
}: GenreGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-6">
      {genres.map((genre) => (
        <GenreButton
          key={genre}
          genre={genre}
          isSelected={selectedGenres.includes(genre)}
          onToggle={() => onToggle(genre)}
        />
      ))}
    </div>
  );
};
