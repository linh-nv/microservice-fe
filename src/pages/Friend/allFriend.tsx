import OrtherLayout from "../../layouts/Orther";
import { useEffect, useState } from "react";
import { friendService } from "../../services/friend";
import { useNotification } from "../../hook/notify";
import { Friends, GetFriendsOptions } from "../../shared/interface";
import { InfiniteList } from "../../components/Navbar/InfiniteList";
import { MenuProps } from "antd";
import { FaFacebookMessenger, FaTrashAlt } from "react-icons/fa";
import { ImEyeBlocked } from "react-icons/im";
import { MdOutlineBlock } from "react-icons/md";

interface MenuItemsProps {
  id: string;
  lastName: string;
}

const menuItems = ({ id, lastName }: MenuItemsProps): MenuProps["items"] => [
  {
    label: (
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookMessenger style={{ marginRight: 8 }} />
        Nhắn tin cho {lastName}
      </a>
    ),
    key: `message-${id}`,
    title: id,
  },
  {
    label: (
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ImEyeBlocked style={{ marginRight: 8 }} />
        Bỏ theo dõi {lastName}
      </a>
    ),
    key: `unfollow-${id}`,
  },
  {
    label: (
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MdOutlineBlock style={{ marginRight: 8 }} />
        Chặn trang cá nhân của {lastName}
      </a>
    ),
    key: `block-${id}`,
  },
  {
    type: "divider",
  },
  {
    label: (
      <a href="#" style={{ color: "red" }}>
        <FaTrashAlt style={{ marginRight: 8 }} />
        Xóa bạn bè
      </a>
    ),
    key: `delete-${id}`,
    danger: true,
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
    console.log(loading);
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
      dropdown={
       <></> 
      }
      menuItems={menuItems}
    />
  );
};

const Content = () => {
  return <></>;
};

const AllFriend = () => {
  return <OrtherLayout navigation={Navigation()} content={Content()} />;
};
export default AllFriend;
