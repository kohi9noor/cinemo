import React, { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = ({
  variant = "primary",
  icon: Icon,
  children,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  const variantStyles = {
    primary:
      "bg-white/10 text-white border border-white/20 hover:bg-white/[0.15] hover:border-white/30",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10",
    ghost: "text-white/70 hover:text-white hover:bg-white/5",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};
