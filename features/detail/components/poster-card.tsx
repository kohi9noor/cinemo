import Image from "next/image";
import type { TMDBMovieDetail, TMDBTVDetail } from "../types/tmdb";
import { getPosterUrl } from "@/features/discovery/utils/tmdb-helpers";

interface PosterCardProps {
  details: TMDBMovieDetail | TMDBTVDetail;
}

export const PosterCard = ({ details }: PosterCardProps) => {
  const title = "title" in details ? details.title : details.name;

  return (
    <div className="aspect-2/3 relative rounded-lg overflow-hidden border border-default">
      <Image
        src={getPosterUrl(details.poster_path)}
        alt={title}
        fill
        className="object-cover"
      />
    </div>
  );
};
