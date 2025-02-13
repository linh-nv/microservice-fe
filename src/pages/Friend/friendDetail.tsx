import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Avatar,
  Button,
  Typography,
  Tabs,
  TabsProps,
} from "antd";
import {
  UserOutlined,
  MessageOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./profile.scss";
import { Link, Outlet, useParams } from "react-router-dom";
import { userService } from "../../services/user";
import { FriendProfile } from "../../shared/interface";
import { FiUserCheck } from "react-icons/fi";
import StickyBox from "react-sticky-box";
import { ProfileHeaderSkeleton } from "./Skeleton/ProfileHeaderSkeleton";
import { AboutSectionSkeleton } from "./Skeleton/AboutSectionSkeleton";
import { routes } from "../../routes/routes";

const { Title, Text } = Typography;

const FriendDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [friend, setFriend] = useState<FriendProfile | null>(null);

  useEffect(() => {
    const fetchFriendData = async (id: string) => {
      try {
        setLoading(true);
        const response = await userService.getUser(id);
        setFriend(response);
      } catch (error) {
        console.error("Error fetching friend data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFriendData(id);
    }
  }, [id]);

  const tabItems: TabsProps["items"] = [
    {
      key: "posts",
      label: "Bài viết",
      children: "Content of Bài viết",
    },
    {
      key: "about",
      label: "Giới thiệu",
      children: "Content of Giới thiệu",
    },
    {
      key: "friends",
      label: "Bạn bè",
      children: "Content of Bạn bè",
    },
    {
      key: "more",
      label: "Xem thêm",
      children: "Content of Xem thêm",
    },
  ];

  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={64} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} />
    </StickyBox>
  );

  return (
    <Layout className="profile-page container bg-transparent mt-5">
      <Card className="profile-header-card">
        {loading ? (
          <>
            <ProfileHeaderSkeleton />
            <Tabs
              defaultActiveKey="posts"
              className="profile-tabs"
              items={tabItems}
              renderTabBar={renderTabBar}
            />
          </>
        ) : (
          <>
            <div className="profile-header">
              <div className="profile-avatar-container">
                <Avatar
                  size={168}
                  icon={<UserOutlined />}
                  className="profile-avatar"
                />
              </div>

              <div className="profile-info">
                <Title level={2}>{friend?.fullName}</Title>
                <Text className="friend-count">10 người bạn · 2 bạn chung</Text>
                <div className="friend-avatars">
                  {friend?.friendProfiles.slice(0, 2).map((friend) => (
                    <Avatar
                      key={friend.id}
                      src={friend?.avatarUrl || undefined}
                      icon={!friend?.avatarUrl ? <UserOutlined /> : undefined}
                      className="friend-avatar"
                    />
                  ))}
                </div>
              </div>

              <div className="profile-actions">
                <Button type="primary" icon={<MessageOutlined />}>
                  Nhắn tin
                </Button>
                <Button icon={<FiUserCheck />}>Bạn bè</Button>
                <Button icon={<UserOutlined />}>...</Button>
              </div>
            </div>

            <Tabs
              defaultActiveKey="posts"
              className="profile-tabs"
              items={tabItems}
              renderTabBar={renderTabBar}
            />
          </>
        )}
      </Card>

      <div className="profile-content my-5 flex items-start gap-5">
        {loading ? (
          <>
            <AboutSectionSkeleton />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <Card className="about-section">
                <Title level={4}>Giới thiệu</Title>
                <div className="about-item">
                  <GlobalOutlined /> Đến từ {friend?.profile.location}
                </div>
              </Card>

              <Card className="about-section">
                <Title level={4}>Bạn bè</Title>
                <div className="about-item">
                  <div className=" bg-white text-gray-900">
                    <div className="grid grid-cols-3 gap-4">
                      {friend?.friendProfiles.map((friend) => (
                        <>
                          <Link
                            to={routes.friend.navigateDetail(friend.id)}
                            className="friend-card"
                          >
                            <img
                              className="rounded-lg"
                              alt="avartar"
                              src={
                                friend.avatarUrl ??
                                "https://static.vecteezy.com/system/resources/previews/021/495/985/non_2x/facebook-social-media-logo-icon-free-png.png"
                              }
                            />
                            <p>{friend.user.fullName}</p>
                          </Link>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="posts-section">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default FriendDetail;
