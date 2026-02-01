import React from "react";

export const FormDivider = ({ text = "or email" }: { text?: string }) => {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/10"></div>
      </div>
      <div className="relative flex justify-center text-[10px] uppercase">
        <span className="bg-transparent px-2 text-white/30">{text}</span>
      </div>
    </div>
  );
};
