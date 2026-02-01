import { useEffect, useState } from "react";

const useScrollTrigger = () => {
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 800;

      if (scrollY > threshold) {
        setShowModel(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { showModel };
};

export default useScrollTrigger;
