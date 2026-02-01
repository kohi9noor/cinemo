"use client";
import Image from "next/image";
import { useMemo } from "react";
import { getRandomLightColor } from "@/lib/color-utils";

interface ProfileIconProps {
  avatarUrl?: string;
  initials: string;
  fullName: string;
  onClick: () => void;
  email?: string;
}

const ProfileIcon = ({
  avatarUrl,
  initials,
  fullName,
  onClick,
  email,
}: ProfileIconProps) => {
  const borderColor = useMemo(
    () => getRandomLightColor(email || fullName),
    [email, fullName],
  );

  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      style={{
        border: `3px solid ${borderColor}`,
        backgroundColor: avatarUrl ? "transparent" : `${borderColor}20`,
      }}
      title={fullName}
    >
      {avatarUrl ? (
        <Image
          width={40}
          height={40}
          src={avatarUrl}
          alt={fullName}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="text-sm font-semibold" style={{ color: borderColor }}>
          {initials}
        </span>
      )}
    </button>
  );
};

export default ProfileIcon;
