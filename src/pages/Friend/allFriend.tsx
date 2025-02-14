import OrtherLayout from "../../layouts/Orther";
import { useEffect, useState } from "react";
import { friendService } from "../../services/friend";
import { useNotification } from "../../hook/notify";
import { Friends, GetFriendsOptions } from "../../shared/interface";
import { InfiniteList } from "../../components/Navbar/InfiniteList";
import { Empty, Input, MenuProps } from "antd";
import { ImEyeBlocked } from "react-icons/im";
import { MdOutlineBlock } from "react-icons/md";
import { useOutlet } from "react-router-dom";
import { RiMessengerLine } from "react-icons/ri";
import { LiaUserTimesSolid } from "react-icons/lia";
import Breadcrumb from "../../components/Breadcrumb";
import { routes } from "../../routes/routes";
import { SearchOutlined } from "@ant-design/icons";

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

const breadcrumbItems = [
  {
    href: routes.friend.home,
    title: "Bạn bè",
  },
];
const Navigation = () => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<Friends[]>([]);
  const { notify } = useNotification();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFriend, setTotalFriend] = useState(1);
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
    loadFriends({ page: currentPage });
  }, []);

  const loadMore = () => {
    if (currentPage < totalPages) {
      loadFriends({ page: currentPage + 1 });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mx-3  border-b pb-3">
        <Breadcrumb title="Danh sách bạn bè" items={breadcrumbItems} />
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Tìm kiếm bạn bè"
          className="rounded-full bg-gray-100"
          // value={searchText}
          // onChange={handleSearch}
        />
      </div>
      <strong className="mx-3 py-2">{`${totalFriend} người bạn`}</strong>
      <InfiniteList
        data={friends}
        hasMore={hasMore}
        loadMore={loadMore}
        menuItems={menuItems}
      />
    </div>
  );
};

const Content = () => {
  const outlet = useOutlet();

  return (
    <div className="content-container container mx-auto w-full max-w-screen-xl xl:px-20">
      {outlet || (
        <Empty
          className="flex flex-col h-screen w-full text-center items-center justify-center"
          description={
            <div className="default-content">
              <p>Please select a section to get started.</p>
            </div>
          }
        />
      )}
    </div>
  );
};

const AllFriend = () => {
  return <OrtherLayout navigation={Navigation()} content={Content()} />;
};
export default AllFriend;
