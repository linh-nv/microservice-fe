import React from "react";
import { Button, Card } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { FriendRequest } from "../../types/friend";
import Meta from "antd/es/card/Meta";

interface FriendCardProps {
  titleAccept: string;
  titleDecline: string;
  titleAccepted: string;
  titleDeclined: string;
  loading: boolean;
  isAccept: boolean;
  isDecline: boolean;
  friend: FriendRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  waiting?: boolean;
}

export const FriendCard: React.FC<FriendCardProps> = ({
  titleAccept,
  titleDecline,
  titleAccepted,
  titleDeclined,
  loading,
  isAccept,
  isDecline,
  friend,
  onAccept,
  onDecline,
  waiting,
}) => {
  // Function to render mutual friends text
  // const renderMutualFriends = () => {
  //   const count = friend.mutualFriends || 0;
  //   if (count === 0) return "Chưa có bạn chung";
  //   return `${count} bạn chung`;
  // };

  // Function to render the appropriate button(s) based on the current state
  const renderButtons = () => {
    if (isAccept) {
      return (
        <Button
          disabled
          block
          icon={<CheckCircleOutlined />}
          className="bg-green-50 text-green-600 border-green-200 hover:bg-green-50 transition-all duration-300 ease-in-out h-10"
        >
          {titleAccepted}
        </Button>
      );
    }

    if (isDecline) {
      return (
        <Button
          disabled
          block
          icon={<CloseCircleOutlined />}
          className="bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-50 transition-all duration-300 ease-in-out h-10"
        >
          {titleDeclined}
        </Button>
      );
    }

    return (
      <div className="flex flex-col gap-2 w-full">
        <Button
          disabled={waiting}
          loading={loading}
          type="primary"
          block
          onClick={() => onAccept(friend.id)}
          className="bg-blue-600 transition-colors duration-300 flex items-center justify-center h-10 font-semibold"
        >
          {titleAccept}
        </Button>

        <Button
          block
          onClick={() => onDecline(friend.id)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-300 flex items-center justify-center h-10 font-semibold"
        >
          {titleDecline}
        </Button>
      </div>
    );
  };

  return (
    // <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-3 flex flex-col items-center border border-gray-100">
    //   <div className="relative mb-4">
    //     <Avatar
    //       size={96}
    //       src={friend?.profile?.avatarUrl || undefined}
    //       icon={!friend?.profile?.avatarUrl ? <UserOutlined /> : undefined}
    //       className="border-2 border-gray-100"
    //     />
    //     {isAccept && (
    //       <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
    //         <CheckCircleOutlined className="text-white text-lg" />
    //       </div>
    //     )}
    //   </div>

    // <h3 className="text-lg font-semibold mb-1 text-gray-800">
    //   {friend.fullName}
    // </h3>

    // <div className="flex items-center gap-2 mb-4">
    //   <span className="text-gray-500 text-sm">
    //     {/* {renderMutualFriends()} */}1 bạn chung
    //   </span>
    // </div>

    //   {/* {friend.profile?.location && (
    //     <p className="text-gray-500 text-sm mb-4">
    //       Sống tại {friend.profile.location}
    //     </p>
    //   )} */}

    //   {renderButtons()}
    // </div>
    <Card
      hoverable
      cover={
        <img
          alt="example"
          src={
            friend?.profile?.avatarUrl ||
            "https://static.vecteezy.com/system/resources/previews/021/495/985/non_2x/facebook-social-media-logo-icon-free-png.png"
          }
        />
      }
    >
      <Meta
        title={
          <>
            <h3 className="text-lg font-semibold mb-1 text-gray-800">
              {friend.fullName}
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-500 text-sm">
                {/* {renderMutualFriends()} */}1 bạn chung
              </span>
            </div>
            {/* {friend.profile?.location && (
            //     <p className="text-gray-500 text-sm mb-4">
            //       Sống tại {friend.profile.location}
            //     </p>
            //   )} */}
          </>
        }
        description={renderButtons()}
      />
    </Card>
  );
};
