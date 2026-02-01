"use client";

import { useContentDetails } from "../hooks/use-content-details";
import { HeroSection } from "./hero-section";
import { PosterCard } from "./poster-card";
import { InfoCard } from "./info-card";
import { OverviewSection } from "./overview-section";
import { CastGrid } from "./cast-grid";

interface DetailPageProps {
  id: number;
  mediaType: "movie" | "tv";
}

export const DetailPage = ({ id, mediaType }: DetailPageProps) => {
  const { details, credits, videos, isLoading } = useContentDetails(
    id,
    mediaType,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/50">Content not found</p>
      </div>
    );
  }

  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );
  const director = credits?.crew.find((c) => c.job === "Director");
  const topCast = credits?.cast.slice(0, 10) || [];

  return (
    <div className="min-h-screen w-full">
      <HeroSection details={details} trailer={trailer} />

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <PosterCard details={details} />
            <InfoCard details={details} director={director} />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <OverviewSection overview={details.overview} />
            <CastGrid cast={topCast} />
          </div>
        </div>
      </div>
    </div>
  );
};
