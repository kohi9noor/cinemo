import React from "react";

interface AuthCardLayoutProps {
  children: React.ReactNode;
}

const AuthCardLayout = ({ children }: AuthCardLayoutProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-sm mx-4 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        <div className="bg-background-glass backdrop-blur-2xl rounded-xl border border-default shadow-2xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthCardLayout;
