import React, { useState } from "react";
import { Input, Avatar, Dropdown } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { NavigationSection } from "./NavigationSection";
import { ActionSection } from "./ActionSection";
import { PROFILE_MENU_ITEMS } from "../../constants/navigationConfig";
import "./styles.scss";
import { useActiveRoute } from "../../hook/useActiveRoute";
import ChatList from "./ActionSection/ChatList";

interface HeaderProps {
  username?: string;
  avatarUrl?: string;
  onSearch?: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  username = "User Name",
  avatarUrl,
  onSearch,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [activeNav, setActiveNav] = useState("home");
  const [activeAction, setActiveAction] = useState("");

  useActiveRoute(setActiveNav);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch?.(value);
  };

  const mockUsers = [
    {
      id: "1",
      name: "a",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1200px-2021_Facebook_icon.svg.png",
      lastMessage: {
        id: "m1",
        content: "123123",
        timestamp: new Date(Date.now() - 9 * 60 * 1000), // 9 minutes ago
      },
      isOnline: true,
      unreadCount: 2,
    },
    // Add more mock users as needed
  ];

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="w-full mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo và Search */}
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1200px-2021_Facebook_icon.svg.png"
                alt="Facebook"
              />
            </div>
            <div className="ml-4 flex-1 max-w-md">
              <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Search Facebook"
                className="rounded-full bg-gray-100 p-2"
                value={searchText}
                onChange={handleSearch}
                bordered={false}
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <NavigationSection
            activeNav={activeNav}
            setActiveNav={setActiveNav}
          />

          {/* User Actions */}
          <div className="flex justify-end items-center flex-1 space-x-2">
            <ActionSection
              activeAction={activeAction}
              setActiveAction={setActiveAction}
              contentMenu={<></>}
              contentMessage={
                <ChatList
                  users={mockUsers}
                  onUserSelect={(userId) =>
                    console.log("Selected user:", userId)
                  }
                />
              }
              contentNotify={<></>}
            />

            {/* Profile Dropdown */}
            <Dropdown
              menu={{ items: PROFILE_MENU_ITEMS }}
              placement="bottomRight"
              className="bg-transparent"
            >
              <button className="flex items-center justify-center border-none">
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  src={avatarUrl}
                  className="cursor-pointer"
                />
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
