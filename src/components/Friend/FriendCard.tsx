import React from "react";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FriendRequest } from "../../types/friend";

interface FriendCardProps {
  titleAccept: string,
  titleDecline: string,
  friend: FriendRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export const FriendCard: React.FC<FriendCardProps> = ({
  titleAccept,
  titleDecline,
  friend,
  onAccept,
  onDecline,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
      <Avatar
        size={80}
        src={friend?.profile?.avatarUrl || undefined}
        icon={!friend?.profile?.avatarUrl ? <UserOutlined /> : undefined}
        className="mb-2"
      />

      <h3 className="text-lg font-medium mb-1">{friend.fullName}</h3>
      <p className="text-gray-500 text-sm mb-3">0 bạn chung</p>
      <div className="flex gap-2 w-full">
        <Button
          type="primary"
          block
          onClick={() => onAccept(friend.id)}
          className="bg-blue-600"
        >
          {titleAccept}
        </Button>
        <Button
          block
          onClick={() => onDecline(friend.id)}
          className="bg-gray-100"
        >
          {titleDecline}
        </Button>
      </div>
    </div>
  );
};
