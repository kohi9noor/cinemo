interface OverviewSectionProps {
  overview: string;
}

export const OverviewSection = ({ overview }: OverviewSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
      <p className="text-white/70 leading-relaxed">{overview}</p>
    </div>
  );
};
