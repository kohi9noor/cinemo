"use client";

import { useContentDetails } from "../hooks/use-content-details";
import { HeroSection } from "./hero-section";
import { PosterCard } from "./poster-card";
import { InfoCard } from "./info-card";
import { OverviewSection } from "./overview-section";
import { CastGrid } from "./cast-grid";
import LazyLoader from "@/components/ui/lazy-loader";

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
    return <LazyLoader size="lg" fullScreen />;
  }

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Content not found</p>
      </div>
    );
  }

  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  console.log(trailer);

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
