import Image from "next/image";

interface ContentCardProps {
  title: string;
  year?: string | number;
  rating?: number;
  posterUrl: string;
  onClick?: () => void;
}

export const ContentCard = ({
  title,
  year,
  rating,
  posterUrl,
  onClick,
}: ContentCardProps) => {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="aspect-3/4 bg-white/5 rounded-md overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02]">
        <Image
          width={400}
          height={400}
          src={posterUrl}
          alt={`${title} poster`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2 space-y-0.5">
        <h3 className="text-xs font-medium text-foreground truncate">
          {title}
        </h3>
        {(year || rating) && (
          <p className="text-xs text-white/50">
            {year && <span>{year}</span>}
            {year && rating && <span> • </span>}
            {rating && <span>⭐ {rating}</span>}
          </p>
        )}
      </div>
    </div>
  );
};
