"use client";

import { useState } from "react";
import SignupCard from "./sign-up";
import SignInCard from "./sign-in";
import AuthCardLayout from "./card-layout";
import useScrollTrigger from "../hooks/use-scroll-trigger";

interface AuthModelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AuthModel = ({ isOpen, onClose }: AuthModelProps = {}) => {
  const [view, setView] = useState<"signin" | "signup">("signin");
  const { showModel, hideModel } = useScrollTrigger();

  const shouldShow = isOpen !== undefined ? isOpen : showModel;
  const handleClose = onClose || hideModel;

  return (
    shouldShow && (
      <AuthCardLayout>
        {view === "signin" ? (
          <SignInCard
            onSwitchToSignup={() => setView("signup")}
            onSuccess={handleClose}
          />
        ) : (
          <SignupCard onSwitchToSignin={() => setView("signin")} />
        )}
      </AuthCardLayout>
    )
  );
};

export default AuthModel;
