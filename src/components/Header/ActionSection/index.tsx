import React, { ReactNode } from "react";
import { Badge, Popover } from "antd";
import "../styles.scss";
import { FaFacebookMessenger, FaThList } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";

interface ActionSectionProps {
  activeAction: string;
  setActiveAction: (action: string) => void;
  contentMenu: ReactNode;
  contentMessage: ReactNode;
  contentNotify: ReactNode;
}

export const ActionSection: React.FC<ActionSectionProps> = ({
  activeAction,
  setActiveAction,
  contentMenu,
  contentMessage,
  contentNotify,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Popover
        content={contentMenu}
        trigger="click"
        placement="bottom"
        open={activeAction === "menu"}
        onOpenChange={(visible) => {
          if (!visible) setActiveAction("");
        }}
      >
        <Badge count={5} size="small" key={"menu"}>
          <button
            key={"menu"}
            className={`action-item relative flex items-center justify-center ${
              activeAction === "menu" ? "action-item-active" : ""
            }`}
            onClick={() =>
              setActiveAction(activeAction === "menu" ? "" : "menu")
            }
          >
            <span className="flex items-center action-icon">
              {<FaThList />}
            </span>
          </button>
        </Badge>
      </Popover>

      <Popover
        content={contentMessage}
        trigger="click"
        placement="bottom"
        open={activeAction === "message"}
        onOpenChange={(visible) => {
          if (!visible) setActiveAction("");
        }}
      >
        <Badge count={5} size="small" key={"message"}>
          <button
            key={"message"}
            className={`action-item relative flex items-center justify-center ${
              activeAction === "message" ? "action-item-active" : ""
            }`}
            onClick={() =>
              setActiveAction(activeAction === "message" ? "" : "message")
            }
          >
            <span className="flex items-center action-icon">
              {<FaFacebookMessenger />}
            </span>
          </button>
        </Badge>
      </Popover>

      <Popover
        content={contentNotify}
        trigger="click"
        placement="bottom"
        open={activeAction === "notification"}
        onOpenChange={(visible) => {
          if (!visible) setActiveAction("");
        }}
      >
        <Badge count={5} size="small" key={"notification"}>
          <button
            key={"notification"}
            className={`action-item relative flex items-center justify-center ${
              activeAction === "notification" ? "action-item-active" : ""
            }`}
            onClick={() =>
              setActiveAction(
                activeAction === "notification" ? "" : "notification"
              )
            }
          >
            <span className="flex items-center action-icon">
              {<IoNotificationsSharp />}
            </span>
          </button>
        </Badge>
      </Popover>
    </div>
  );
};
