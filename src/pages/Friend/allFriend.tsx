import OrtherLayout from "../../layouts/Orther";
import { useEffect, useState } from "react";
import { friendService } from "../../services/friend";
import { useNotification } from "../../hook/notify";
import { Friends, GetFriendsOptions } from "../../shared/interface";
import { InfiniteList } from "../../components/Navbar/InfiniteList";
import { MenuProps } from "antd";
import { ImEyeBlocked } from "react-icons/im";
import { MdOutlineBlock } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { RiMessengerLine } from "react-icons/ri";
import { LiaUserTimesSolid } from "react-icons/lia";

interface MenuItemsProps {
  id: string;
  lastName: string;
}

const menuItems = ({ id, lastName }: MenuItemsProps): MenuProps["items"] => [
  {
    label: `Nhắn tin cho ${lastName}`,
    key: `message-${id}`,
    icon: <RiMessengerLine size={18} />,
    title: `Nhắn tin cho ${lastName}`,
    onClick: () => console.log(123),
  },
  {
    label: `Bỏ theo dõi ${lastName}`,
    icon: <ImEyeBlocked size={18} />,
    key: `unfollow-${id}`,
    title: `Bỏ theo dõi ${lastName}`,
    onClick: () => console.log(123),
  },
  {
    label: `Chặn trang cá nhân của ${lastName}`,
    key: `block-${id}`,
    title: `Chặn trang cá nhân của ${lastName}`,
    icon: <MdOutlineBlock size={18} />,
    onClick: () => console.log(123),
  },
  {
    type: "divider",
  },
  {
    label: "Xóa bạn bè",
    icon: <LiaUserTimesSolid size={18} />,
    key: `delete-${id}`,
    danger: true,
    title: "Xóa bạn bè",
    onClick: () => console.log(123),
  },
];

const Navigation = () => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<Friends[]>([]);
  const { notify } = useNotification();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const loadFriends = async (options: GetFriendsOptions) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);

      const response = await friendService.getFriends(options);

      if (options.page === 1) {
        setFriends(response.data);
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
    loadFriends({ page: currentPage });
  }, []);

  const loadMore = () => {
    if (currentPage < totalPages) {
      loadFriends({ page: currentPage + 1 });
    }
  };

  return (
    <InfiniteList
      data={friends}
      hasMore={hasMore}
      loadMore={loadMore}
      menuItems={menuItems}
    />
  );
};

const Content = () => {
  return <Outlet />;
};

const AllFriend = () => {
  return <OrtherLayout navigation={Navigation()} content={Content()} />;
};
export default AllFriend;
