import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const useScrollTrigger = () => {
  const [showModel, setShowModel] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setAuthenticated(!!user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setAuthenticated(!!session);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const threshold = 400;
      if (scrollY > threshold) {
        if (!isAuthenticated) {
          setShowModel(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAuthenticated]);

  // Disable body scroll when modal is shown
  useEffect(() => {
    if (showModel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModel]);

  const hideModel = () => {
    setShowModel(false);
  };

  return { showModel, hideModel };
};

export default useScrollTrigger;
