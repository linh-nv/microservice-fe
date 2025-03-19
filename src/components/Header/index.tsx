import React, { useState, useEffect } from "react";
import { Input, Avatar, Dropdown } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { NavigationSection } from "./NavigationSection";
import { ActionSection } from "./ActionSection";
import { PROFILE_MENU_ITEMS } from "../../constants/navigationConfig";
import "./styles.scss";
import { useActiveRoute } from "../../hook/useActiveRoute";
import ChatList from "./ActionSection/ChatList";
import { Friends, GetFriendsOptions } from "../../shared/interface";
import { friendService } from "../../services/friend";
import { useNotification } from "../../hook/notify";

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
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<Friends[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalFriend, setTotalFriend] = useState(1);
  const { notify } = useNotification();
  const [receiver, setReceiver] = useState<number | null>(null);

  useActiveRoute(setActiveNav);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch?.(value);
  };

  const loadFriends = async (options: GetFriendsOptions) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);

      const response = await friendService.getFriends(options);

      if (options.page === 1) {
        setFriends(response.data);
        setTotalFriend(response.total);
      } else {
        setFriends((prev) => [...prev, ...response.data]);
      }

      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
      setHasMore(response.currentPage < response.totalPages);
    } catch (error) {
      notify("error", { message: "Lỗi" });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeAction === "message") {
      loadFriends({ page: currentPage });
    } else {
      setFriends([]);
    }
  }, [activeAction]);

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
              receiver={receiver}
              activeAction={activeAction}
              setActiveAction={setActiveAction}
              contentMenu={<></>}
              contentMessage={
                <ChatList
                  users={friends}
                  onUserSelect={(userId) => {
                    setReceiver(parseInt(userId));
                  }}
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
