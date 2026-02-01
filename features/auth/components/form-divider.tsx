import React from "react";

export const FormDivider = ({ text = "or email" }: { text?: string }) => {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-default"></div>
      </div>
      <div className="relative flex justify-center text-[10px] uppercase">
        <span className="bg-transparent px-2 text-muted">{text}</span>
      </div>
    </div>
  );
};
