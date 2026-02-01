import React from "react";
import { LucideIcon } from "lucide-react";

interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: LucideIcon;
  rightIcon?: React.ReactNode;
  helperText?: string;
  required?: boolean;
}

export const FormInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  rightIcon,
  helperText,
  required = false,
}: FormInputProps) => {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-white/70">{label}</label>
      <div className="relative">
        <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-transparent transition-all"
          required={required}
        />
        {rightIcon && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      {helperText && <p className="text-[10px] text-white/30">{helperText}</p>}
    </div>
  );
};
