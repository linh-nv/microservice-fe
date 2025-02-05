import React from "react";
import { FriendCard } from "./FriendCard";
import { FriendRequest } from "../../types/friend";

interface FriendGridProps {
  friends: FriendRequest[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export const FriendGrid: React.FC<FriendGridProps> = ({
  friends,
  onAccept,
  onDecline,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {friends.map((friend) => (
        <FriendCard
          key={friend.id}
          friend={friend}
          onAccept={onAccept}
          onDecline={onDecline}
        />
      ))}
    </div>
  );
};
