"use client";
import Image from "next/image";

interface ProfileIconProps {
  avatarUrl?: string;
  initials: string;
  fullName: string;
  onClick: () => void;
}

const ProfileIcon = ({
  avatarUrl,
  initials,
  fullName,
  onClick,
}: ProfileIconProps) => {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-lg bg-linear-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
      title={fullName}
    >
      {avatarUrl ? (
        <Image
          width={40}
          height={40}
          src={avatarUrl}
          alt={fullName}
          className="w-full h-full rounded-lg object-cover"
        />
      ) : (
        <span className="text-sm font-semibold text-white/80">{initials}</span>
      )}
    </button>
  );
};

export default ProfileIcon;
