import OrtherLayout from "../../layouts/Orther";
import { Menu } from "antd";
import { FaAddressBook, FaUserFriends } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { FriendRequests } from "../../components/Friend/FriendRequests";
import { friendService } from "../../services/friend";
import { FriendSuggests } from "../../components/Friend/FriendSuggests";
import { FriendWaitAccept } from "../../components/Friend/FriendWaitAccept";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";


const Navigation = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "home",
      icon: (
        <div className="mr-4">
          <FaUserFriends size={18} />
        </div>
      ),
      label: "Trang chủ",
      onClick: () => navigate(routes.friend.home),
    },
    {
      key: "friend_requests",
      icon: (
        <div className="mr-4">
          <FaAddressBook size={18} />
        </div>
      ),
      label: "Lời mời kết bạn",
    },
    {
      key: "suggestions",
      icon: (
        <div className="mr-4">
          <IoPersonAddSharp size={18} />
        </div>
      ),
      label: "Gợi ý",
    },
    {
      key: "all_friends",
      icon: (
        <div className="mr-4">
          <FaUserGroup size={18} />
        </div>
      ),
      label: "Tất cả bạn bè",
      onClick: () => navigate(routes.friend.all),
    },
  ];

  return (
    <>
      <div className="mx-5 my-3">
        <h2 className="text-2xl font-bold">Bạn bè</h2>
      </div>
      <Menu
        mode="vertical"
        items={items}
        style={{ borderRight: 0, fontSize: "16px", fontWeight: 500 }}
        defaultSelectedKeys={["home"]}
      />
    </>
  );
};

const Content = () => {
  const fetchFriendRequests = async (page: number) => {
    const friendRequests = await friendService.getPendingRequests(page);
    return friendRequests;
  };

  const fetchSendPendingRequests = async (page: number) => {
    const friendRequests = await friendService.getSendPendingRequests(page);
    return friendRequests;
  };

  const fetchFriendSuggestions = async (page: number) => {
    const friendSuggestions = await friendService.getFriendSuggestions(page);
    return friendSuggestions;
  };

  return (
    <div className="p-4">
      <FriendRequests
        title="Lời mời kết bạn"
        fetchFriends={fetchFriendRequests}
      />

      <FriendWaitAccept
        title="Đang chờ chấp thuận"
        fetchFriends={fetchSendPendingRequests}
      />

      <FriendSuggests
        title="Gợi ý kết bạn"
        fetchFriends={fetchFriendSuggestions}
      />
    </div>
  );
};
const Friend = () => {
  return <OrtherLayout navigation={Navigation()} content={Content()} />;
};

export default Friend;
