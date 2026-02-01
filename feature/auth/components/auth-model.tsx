"use client";

import { useState } from "react";
import SignupCard from "./sign-up";
import SignInCard from "./sign-in";
import AuthCardLayout from "./card-layout";
import useScrollTrigger from "../hooks/use-scroll-trigger";

const AuthModel = () => {
  const [view, setView] = useState<"signin" | "signup">("signin");
  const { showModel, hideModel } = useScrollTrigger();

  return (
    showModel && (
      <AuthCardLayout>
        {view === "signin" ? (
          <SignInCard
            onSwitchToSignup={() => setView("signup")}
            onSuccess={hideModel}
          />
        ) : (
          <SignupCard onSwitchToSignin={() => setView("signin")} />
        )}
      </AuthCardLayout>
    )
  );
};

export default AuthModel;
