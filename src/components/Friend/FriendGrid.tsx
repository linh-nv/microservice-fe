import React from "react";
import { FriendCard } from "./FriendCard";
import { FriendRequest } from "../../types/friend";

interface FriendGridProps {
  titleAccept: string;
  titleDecline: string;
  getCardState: (id: string) => {
    isAccept: boolean;
    isDecline: boolean;
    loading: boolean;
  };
  titleAccepted: string;
  titleDeclined: string;
  friends: FriendRequest[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  waiting?: boolean;
}

export const FriendGrid: React.FC<FriendGridProps> = ({
  titleAccept,
  titleDecline,
  titleAccepted,
  titleDeclined,
  getCardState,
  friends,
  onAccept,
  onDecline,
  waiting,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {friends.map((friend) => {
        const { isAccept, isDecline, loading } = getCardState(friend.id);

        return (
          <FriendCard
            key={friend.id}
            friend={friend}
            loading={loading}
            isAccept={isAccept}
            isDecline={isDecline}
            titleAccept={titleAccept}
            titleDecline={titleDecline}
            titleAccepted={titleAccepted}
            titleDeclined={titleDeclined}
            onAccept={onAccept}
            onDecline={onDecline}
            waiting={waiting}
          />
        );
      })}
    </div>
  );
};
