import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useActiveRoute = (setActiveNav: (nav: string) => void) => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      setActiveNav("home");
    } else if (currentPath.startsWith("/friend")) {
      setActiveNav("groups");
    }

  }, [location.pathname, setActiveNav]);
};
