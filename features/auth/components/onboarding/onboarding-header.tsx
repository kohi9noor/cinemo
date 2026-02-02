interface OnboardingHeaderProps {
  step: "movie" | "tv";
}

export const OnboardingHeader = ({ step }: OnboardingHeaderProps) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-xl font-semibold text-primary mb-1">
        {step === "movie"
          ? "Pick Your Favorite Movie Genres"
          : "Pick Your Favorite TV Genres"}
      </h2>
      <p className="text-muted text-xs">
        {step === "movie"
          ? "Select at least 3 genres you love"
          : "Select at least 3 genres you enjoy"}
      </p>
      <div className="flex gap-2 justify-center mt-3">
        <div
          className={`h-1.5 w-8 rounded-full ${
            step === "movie" ? "bg-accent" : "bg-border"
          }`}
        />
        <div
          className={`h-1.5 w-8 rounded-full ${
            step === "tv" ? "bg-accent" : "bg-border"
          }`}
        />
      </div>
    </div>
  );
};
