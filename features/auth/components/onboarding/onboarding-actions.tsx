import { Button } from "../button";

interface OnboardingActionsProps {
  step: "movie" | "tv";
  selectedCount: number;
  isLoading: boolean;
  onNext: () => void;
  onComplete: () => void;
}

const MIN_SELECTIONS = 3;

export const OnboardingActions = ({
  step,
  selectedCount,
  isLoading,
  onNext,
  onComplete,
}: OnboardingActionsProps) => {
  const isDisabled = selectedCount < MIN_SELECTIONS;
  const remaining = MIN_SELECTIONS - selectedCount;

  return (
    <>
      {step === "movie" ? (
        <Button
          variant="primary"
          fullWidth
          onClick={onNext}
          disabled={isDisabled}
        >
          Continue to TV Genres
        </Button>
      ) : (
        <Button
          variant="primary"
          fullWidth
          onClick={onComplete}
          disabled={isDisabled || isLoading}
        >
          {isLoading ? "Saving preferences..." : "Complete Setup"}
        </Button>
      )}

      {isDisabled && (
        <p className="text-muted text-xs text-center mt-2">
          Select {remaining} more to continue
        </p>
      )}
    </>
  );
};
