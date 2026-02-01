import Image from "next/image";
import type { TMDBMovieDetail, TMDBTVDetail } from "../types/tmdb";

interface PosterCardProps {
  details: TMDBMovieDetail | TMDBTVDetail;
}

const getPosterUrl = (path: string | null) => {
  if (!path) return "/placeholder-poster.jpg";
  return `https://image.tmdb.org/t/p/w500${path}`;
};

export const PosterCard = ({ details }: PosterCardProps) => {
  const title = "title" in details ? details.title : details.name;

  return (
    <div className="aspect-[2/3] relative rounded-lg overflow-hidden border border-white/10">
      <Image
        src={getPosterUrl(details.poster_path)}
        alt={title}
        fill
        className="object-cover"
      />
    </div>
  );
};
