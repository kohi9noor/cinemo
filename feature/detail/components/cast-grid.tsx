import Image from "next/image";
import type { CastMember } from "../types/tmdb";

interface CastGridProps {
  cast: CastMember[];
}

const getProfileUrl = (path: string | null) => {
  if (!path) return "/placeholder-avatar.jpg";
  return `https://image.tmdb.org/t/p/w200${path}`;
};

export const CastGrid = ({ cast }: CastGridProps) => {
  if (cast.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-4">Cast</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cast.map((member) => (
          <div key={member.id} className="space-y-2">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-white/5 border border-white/10">
              <Image
                src={getProfileUrl(member.profile_path)}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{member.name}</p>
              <p className="text-white/50 text-xs">{member.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
