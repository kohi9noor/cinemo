"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBar = ({ value, onChange, onClear }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative flex items-center gap-2 px-4 py-3 bg-white/5 border rounded-lg transition-all ${
        isFocused
          ? "border-hover bg-background-card"
          : "border-default hover:border-hover"
      }`}
    >
      <Search className="w-5 h-5 text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search movies, TV shows..."
        className="flex-1 bg-transparent text-primary placeholder:text-muted outline-none text-sm"
      />
      {value && (
        <button
          onClick={onClear}
          className="text-muted hover:text-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
