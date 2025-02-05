import React from "react";
import { Badge } from "antd";
import { ACTION_ITEMS } from "../../constants/navigationConfig";
import "./styles.scss";

interface ActionSectionProps {
  activeAction: string;
  setActiveAction: (action: string) => void;
}

export const ActionSection: React.FC<ActionSectionProps> = ({
  activeAction,
  setActiveAction,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {ACTION_ITEMS.map(({ id, icon, badge }) => (
        <Badge count={badge} size="small" key={id}>
          <button
            key={id}
            className={`action-item relative flex items-center justify-center ${
              activeAction === id ? "action-item-active" : ""
            }`}
            onClick={() => setActiveAction(activeAction === id ? "" : id)}
          >
            <span className="flex items-center action-icon">{icon}</span>
          </button>
        </Badge>
      ))}
    </div>
  );
};
