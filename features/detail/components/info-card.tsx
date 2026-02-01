import type { TMDBMovieDetail, TMDBTVDetail, CrewMember } from "../types/tmdb";

interface InfoCardProps {
  details: TMDBMovieDetail | TMDBTVDetail;
  director?: CrewMember;
}

export const InfoCard = ({ details, director }: InfoCardProps) => {
  return (
    <div className="space-y-4 p-6 bg-card rounded-lg border border-default">
      <div>
        <h3 className="text-muted text-sm mb-1">Status</h3>
        <p className="text-primary">{details.status}</p>
      </div>

      {"number_of_seasons" in details && (
        <>
          <div>
            <h3 className="text-muted text-sm mb-1">Seasons</h3>
            <p className="text-primary">{details.number_of_seasons}</p>
          </div>
          <div>
            <h3 className="text-muted text-sm mb-1">Episodes</h3>
            <p className="text-primary">{details.number_of_episodes}</p>
          </div>
        </>
      )}

      {director && (
        <div>
          <h3 className="text-muted text-sm mb-1">Director</h3>
          <p className="text-primary">{director.name}</p>
        </div>
      )}
    </div>
  );
};
