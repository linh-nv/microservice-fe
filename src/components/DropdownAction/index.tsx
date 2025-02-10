import React from "react";
import { Dropdown } from "antd";
import { HiDotsHorizontal } from "react-icons/hi";
import { MenuProps } from "antd";

interface DropdownActionProps {
  items: MenuProps["items"];
}

const DropdownAction: React.FC<DropdownActionProps> = ({ items }) => (
  <Dropdown menu={{ items }} trigger={["click"]}>
    <a
      onClick={(e) => e.preventDefault()}
      className="hover:bg-gray-100 rounded-full p-1"
    >
      <HiDotsHorizontal color="#9ca3af" size={20} />
    </a>
  </Dropdown>
);

export default DropdownAction;
