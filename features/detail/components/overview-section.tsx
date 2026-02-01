interface OverviewSectionProps {
  overview: string;
}

export const OverviewSection = ({ overview }: OverviewSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary mb-4">Overview</h2>
      <p className="text-secondary leading-relaxed">{overview}</p>
    </div>
  );
};
