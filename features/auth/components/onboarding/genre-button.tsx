import { Check } from "lucide-react";

interface GenreButtonProps {
  genre: string;
  isSelected: boolean;
  onToggle: () => void;
}

export const GenreButton = ({
  genre,
  isSelected,
  onToggle,
}: GenreButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={`px-3 py-2 rounded-lg text-sm transition-all border ${
        isSelected
          ? "bg-accent/20 border-accent text-primary font-medium"
          : "bg-muted-background border-default text-secondary hover:bg-background-card"
      }`}
    >
      <span className="flex items-center justify-center gap-1.5">
        {isSelected && <Check className="w-3 h-3" />}
        {genre}
      </span>
    </button>
  );
};
