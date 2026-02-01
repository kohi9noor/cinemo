import type { TMDBMovieDetail, TMDBTVDetail, CrewMember } from "../types/tmdb";

interface InfoCardProps {
  details: TMDBMovieDetail | TMDBTVDetail;
  director?: CrewMember;
}

export const InfoCard = ({ details, director }: InfoCardProps) => {
  return (
    <div className="space-y-4 p-6 bg-white/5 rounded-lg border border-white/10">
      <div>
        <h3 className="text-white/50 text-sm mb-1">Status</h3>
        <p className="text-white">{details.status}</p>
      </div>

      {"number_of_seasons" in details && (
        <>
          <div>
            <h3 className="text-white/50 text-sm mb-1">Seasons</h3>
            <p className="text-white">{details.number_of_seasons}</p>
          </div>
          <div>
            <h3 className="text-white/50 text-sm mb-1">Episodes</h3>
            <p className="text-white">{details.number_of_episodes}</p>
          </div>
        </>
      )}

      {director && (
        <div>
          <h3 className="text-white/50 text-sm mb-1">Director</h3>
          <p className="text-white">{director.name}</p>
        </div>
      )}
    </div>
  );
};
