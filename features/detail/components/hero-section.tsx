import Image from "next/image";
import { Star, Calendar, Clock, Play, Link } from "lucide-react";
import { WatchlistButton } from "@/features/watchlist/components/watchlist-button";
import type { TMDBMovieDetail, TMDBTVDetail, Video } from "../types/tmdb";
import { getBackdropUrl } from "@/features/discovery/utils/tmdb-helpers";

interface HeroSectionProps {
  details: TMDBMovieDetail | TMDBTVDetail;
  trailer?: Video;
}

export const HeroSection = ({ details, trailer }: HeroSectionProps) => {
  const title = "title" in details ? details.title : details.name;

  const releaseDate =
    "release_date" in details ? details.release_date : details.first_air_date;

  const runtime =
    "runtime" in details
      ? details.runtime
      : details.episode_run_time[0] || null;

  return (
    <div className="relative h-[60vh] w-full">
      <Image
        src={getBackdropUrl(details.backdrop_path)}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4">{title}</h1>

        {details.tagline && (
          <p className="text-white/70 text-lg italic mb-4">{details.tagline}</p>
        )}

        <div className="flex items-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">
              {details.vote_average.toFixed(1)}
            </span>
          </div>

          {releaseDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(releaseDate).getFullYear()}</span>
            </div>
          )}

          {runtime && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{runtime} min</span>
            </div>
          )}

          <div className="flex gap-2">
            {details.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-white/10 rounded-full text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          {trailer && (
            <Link
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all"
            >
              <Play className="w-5 h-5" />
              Watch Trailer
            </Link>
          )}

          <WatchlistButton
            contentId={details.id}
            mediaType={"title" in details ? "movie" : "tv"}
            title={"title" in details ? details.title : details.name}
            posterPath={details.poster_path}
            releaseDate={
              "release_date" in details
                ? details.release_date
                : details.first_air_date
            }
            rating={details.vote_average.toFixed(1)}
          />
        </div>
      </div>
    </div>
  );
};
