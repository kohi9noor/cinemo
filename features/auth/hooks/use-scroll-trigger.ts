import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const useScrollTrigger = () => {
  const [showModel, setShowModel] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
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

  const hideModel = () => {
    setShowModel(false);
  };

  return { showModel, hideModel };
};

export default useScrollTrigger;
