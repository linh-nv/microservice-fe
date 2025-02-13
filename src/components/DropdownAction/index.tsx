import React from "react";
import { Dropdown, Tooltip, TooltipProps } from "antd";
import { HiDotsHorizontal } from "react-icons/hi";
import { MenuProps } from "antd";
import classNames from "classnames";

type PlacementType = TooltipProps["placement"];

interface DropdownActionProps {
  items: MenuProps["items"];
  title?: React.ReactNode;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  placement?: PlacementType;
  className?: string;
  buttonClassName?: string;
  iconSize?: number;
  iconColor?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  tooltipProps?: Partial<TooltipProps>;
  onVisibleChange?: (visible: boolean) => void;
  trigger?: ("click" | "hover" | "contextMenu")[];
  showTooltip?: boolean;
}

const DropdownAction: React.FC<DropdownActionProps> = ({
  items,
  style,
  buttonStyle,
  title,
  placement = "bottom",
  className,
  buttonClassName,
  iconSize = 12,
  iconColor = "#9ca3af",
  disabled = false,
  icon,
  tooltipProps,
  onVisibleChange,
  trigger = ["click"],
  showTooltip = true,
}) => {
  const ActionButton = (
    <div
      style={style}
      className={classNames(
        "inline-block",
        { "opacity-50 cursor-not-allowed": disabled },
        className
      )}
    >
      <a
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
        className={classNames(
          "bg-white aspect-square rounded-full p-1 border border-gray-200",
          "flex justify-center items-center transition-all duration-200",
          "hover:bg-gray-50 active:bg-gray-100",
          { "cursor-not-allowed": disabled },
          buttonClassName
        )}
        style={buttonStyle}
      >
        {icon || <HiDotsHorizontal color={iconColor} size={iconSize} />}
      </a>
    </div>
  );

  const WrappedDropdown = (
    <Dropdown
      menu={{ items }}
      trigger={disabled ? [] : trigger}
      disabled={disabled}
      onOpenChange={onVisibleChange}
    >
      {ActionButton}
    </Dropdown>
  );

  return showTooltip ? (
    <Tooltip
      title={disabled ? "Not available" : title}
      placement={placement}
      {...tooltipProps}
    >
      {WrappedDropdown}
    </Tooltip>
  ) : (
    WrappedDropdown
  );
};

export default DropdownAction;
