import React from "react";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ITEMS } from "../../constants/navigationConfig";
import "./styles.scss";

interface NavigationSectionProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const NavigationSection: React.FC<NavigationSectionProps> = ({
  activeNav,
  setActiveNav,
}) => {
  const navigate = useNavigate();

  const handleNavigation = (id: string, path: string) => {
    setActiveNav(id);
    navigate(path);
  };

  return (
    <div className="flex justify-center flex-1">
      <div className="flex space-x-2">
        {NAVIGATION_ITEMS.map(({ id, path, icon }) => (
          <button
            key={id}
            className={`nav-item ${activeNav === id ? "nav-item-active" : ""}`}
            onClick={() => handleNavigation(id, path)}
          >
            <span className="nav-icon">{icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
