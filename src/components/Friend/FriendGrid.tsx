import React from "react";
import { FriendCard } from "./FriendCard";
import { FriendRequest } from "../../types/friend";

interface FriendGridProps {
  titleAccept: string,
  titleDecline: string,
  friends: FriendRequest[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export const FriendGrid: React.FC<FriendGridProps> = ({
  titleAccept,
  titleDecline,
  friends,
  onAccept,
  onDecline,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {friends.map((friend) => (
        <FriendCard
          key={friend.id}
          friend={friend}
          titleAccept={titleAccept}
          titleDecline={titleDecline}
          onAccept={onAccept}
          onDecline={onDecline}
        />
      ))}
    </div>
  );
};
