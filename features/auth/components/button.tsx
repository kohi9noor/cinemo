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
      "bg-background-card text-primary border border-default hover:bg-background-glass hover:border-hover",
    secondary:
      "bg-muted-background text-primary border border-default hover:bg-background-card",
    ghost: "text-secondary hover:text-primary hover:bg-muted-background",
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
