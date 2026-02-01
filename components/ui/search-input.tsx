"use client";
import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export const SearchInput = ({
  placeholder = "Search...",
  value,
  onChange,
  onSubmit,
}: SearchInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit(e.currentTarget.value);
    }
  };

  return (
    <div className="h-12 w-full rounded-2xl border border-border flex items-center px-2 focus-within:border-border focus-within:bg-glass-highlight">
      <SearchIcon size={12} className="h-5 w-5 text-muted-foreground mr-2" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-full text-sm font-medium bg-transparent outline-none border-none placeholder:text-muted-foreground"
      />
    </div>
  );
};
