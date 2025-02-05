import OrtherLayout from "../../layouts/Orther";
import { Menu } from "antd";
import { FaAddressBook, FaUserFriends } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { FriendRequests } from "../../components/Friend/FriendRequests";
import { FriendRequest } from "../../types/friend";

const Navigation = () => {
  const items = [
    {
      key: "home",
      icon: (
        <div className="mr-4">
          <FaUserFriends size={18} />
        </div>
      ),
      label: "Trang chủ",
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
  const fetchFriendRequests = async (
    page: number
  ): Promise<FriendRequest[]> => {
    // Giả lập API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: `1`,
            name: "Nguyễn Văn A",
            avatarUrl:
              "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s240x240&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=7gIifu-CZRIQ7kNvgHzQgGj&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=Apsxbe6fPiQ5kRydMLkehYV&oh=00_AYAl_gZjMvYFOJBQMqGSysOzkf6D_DeJMv4kIORLkzbd2A&oe=67CA7BFA",
            mutualFriends: 5,
            status: "pending",
          },
          {
            id: `2`,
            name: "Nguyễn Văn B",
            avatarUrl:
              "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s240x240&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=7gIifu-CZRIQ7kNvgHzQgGj&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=Apsxbe6fPiQ5kRydMLkehYV&oh=00_AYAl_gZjMvYFOJBQMqGSysOzkf6D_DeJMv4kIORLkzbd2A&oe=67CA7BFA",
            mutualFriends: 5,
            status: "pending",
          },
          {
            id: `3`,
            name: "Nguyễn Văn C",
            avatarUrl:
              "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s240x240&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=7gIifu-CZRIQ7kNvgHzQgGj&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=Apsxbe6fPiQ5kRydMLkehYV&oh=00_AYAl_gZjMvYFOJBQMqGSysOzkf6D_DeJMv4kIORLkzbd2A&oe=67CA7BFA",
            mutualFriends: 5,
            status: "pending",
          },
          {
            id: `4`,
            name: "Nguyễn Văn A",
            avatarUrl:
              "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s240x240&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=7gIifu-CZRIQ7kNvgHzQgGj&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=Apsxbe6fPiQ5kRydMLkehYV&oh=00_AYAl_gZjMvYFOJBQMqGSysOzkf6D_DeJMv4kIORLkzbd2A&oe=67CA7BFA",
            mutualFriends: 5,
            status: "pending",
          },
          {
            id: `5`,
            name: "Nguyễn Văn B",
            avatarUrl:
              "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s240x240&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=7gIifu-CZRIQ7kNvgHzQgGj&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=Apsxbe6fPiQ5kRydMLkehYV&oh=00_AYAl_gZjMvYFOJBQMqGSysOzkf6D_DeJMv4kIORLkzbd2A&oe=67CA7BFA",
            mutualFriends: 5,
            status: "pending",
          },
          {
            id: `6`,
            name: "Nguyễn Văn C",
            avatarUrl:
              "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s240x240&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=7gIifu-CZRIQ7kNvgHzQgGj&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=Apsxbe6fPiQ5kRydMLkehYV&oh=00_AYAl_gZjMvYFOJBQMqGSysOzkf6D_DeJMv4kIORLkzbd2A&oe=67CA7BFA",
            mutualFriends: 5,
            status: "pending",
          },
          {
            id: `7`,
            name: "Nguyễn Văn A",
            avatarUrl:
              "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s240x240&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=7gIifu-CZRIQ7kNvgHzQgGj&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=Apsxbe6fPiQ5kRydMLkehYV&oh=00_AYAl_gZjMvYFOJBQMqGSysOzkf6D_DeJMv4kIORLkzbd2A&oe=67CA7BFA",
            mutualFriends: 5,
            status: "pending",
          },
          {
            id: `8`,
            name: "Nguyễn Văn B",
            avatarUrl:
              "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s240x240&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=7gIifu-CZRIQ7kNvgHzQgGj&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=Apsxbe6fPiQ5kRydMLkehYV&oh=00_AYAl_gZjMvYFOJBQMqGSysOzkf6D_DeJMv4kIORLkzbd2A&oe=67CA7BFA",
            mutualFriends: 5,
            status: "pending",
          },
          {
            id: `9`,
            name: "Nguyễn Văn C",
            avatarUrl:
              "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s240x240&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=7gIifu-CZRIQ7kNvgHzQgGj&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=Apsxbe6fPiQ5kRydMLkehYV&oh=00_AYAl_gZjMvYFOJBQMqGSysOzkf6D_DeJMv4kIORLkzbd2A&oe=67CA7BFA",
            mutualFriends: 5,
            status: "pending",
          },
          {
            id: `10`,
            name: "Nguyễn Văn C",
            avatarUrl:
              "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s240x240&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=7gIifu-CZRIQ7kNvgHzQgGj&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=Apsxbe6fPiQ5kRydMLkehYV&oh=00_AYAl_gZjMvYFOJBQMqGSysOzkf6D_DeJMv4kIORLkzbd2A&oe=67CA7BFA",
            mutualFriends: 5,
            status: "pending",
          },
        ]);
      }, 1000);
    });
  };

  const fetchFriendSuggestions = async (
    page: number
  ): Promise<FriendRequest[]> => {
    // Tương tự như trên
    return fetchFriendRequests(page);
  };

  return (
    <div className="px-4 py-6">
      <FriendRequests
        title="Lời mời kết bạn"
        fetchFriends={fetchFriendRequests}
        rowsPerLoad={2}
      />

      <FriendRequests
        title="Gợi ý kết bạn"
        fetchFriends={fetchFriendSuggestions}
        rowsPerLoad={2}
        infiniteScroll={true}
      />
    </div>
  );
};
const Friend = () => {
  return <OrtherLayout navigation={Navigation()} content={Content()} />;
};

export default Friend;
