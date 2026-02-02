import Image from "next/image";
import type { CastMember } from "../types/tmdb";
import { getProfileUrl } from "@/features/discovery/utils/tmdb-helpers";

interface CastGridProps {
  cast: CastMember[];
}

export const CastGrid = ({ cast }: CastGridProps) => {
  if (cast.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary mb-4">Cast</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cast.map((member) => (
          <div key={member.id} className="space-y-2">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-card border border-default">
              <Image
                src={getProfileUrl(member.profile_path)}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-primary text-sm font-medium">{member.name}</p>
              <p className="text-muted text-xs">{member.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
