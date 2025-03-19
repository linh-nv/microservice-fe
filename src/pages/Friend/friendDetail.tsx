import React, { useEffect, useState } from "react";
import { Layout, Card, Avatar, Button, Typography } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./profile.scss";
import { Link, useParams } from "react-router-dom";
import { userService } from "../../services/user";
import { FriendProfile } from "../../shared/interface";
import { FiUserCheck } from "react-icons/fi";
import { ProfileHeaderSkeleton } from "./Skeleton/ProfileHeaderSkeleton";
import { AboutSectionSkeleton } from "./Skeleton/AboutSectionSkeleton";
import { routes } from "../../routes/routes";
import SocialCard from "../../components/Card/PostCard";

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

  return (
    <Layout className="profile-page container bg-transparent mt-5">
      <Card className="profile-header-card">
        {loading ? (
          <>
            <ProfileHeaderSkeleton />
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
                <Title level={2}>{friend?.name}</Title>
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
          </>
        )}
      </Card>

      <div className="profile-content my-3 flex justify-center gap-3">
        {loading ? (
          <>
            <AboutSectionSkeleton />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 w-[40%]">
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
                            <p>{friend.user.name}</p>
                          </Link>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="posts-section">
              {friend && (
                <SocialCard
                  author={{
                    name: friend.name,
                    avatar: friend.profile.avatarUrl,
                    timestamp: new Date("2024-01-15"),
                  }}
                  content="em"
                  images={[
                    "https://static.vecteezy.com/system/resources/previews/021/495/985/non_2x/facebook-social-media-logo-icon-free-png.png",
                  ]}
                  reactions={[{ type: "LIKE", count: 25 }]}
                  commentCount={25}
                  shareCount={5}
                  onLike={() => console.log("Liked")}
                  onComment={() => console.log("Comment clicked")}
                  onShare={() => console.log("Share clicked")}
                />
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default FriendDetail;
