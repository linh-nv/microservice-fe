import React, { useState, useCallback, useEffect, useRef } from "react";
import { Empty, Spin } from "antd";
import { FriendGrid } from "./FriendGrid";
import { FriendRequest } from "../../types/friend";
import { useNotification } from "../../hook/notify";
import { friendService } from "../../services/friend";

interface PaginatedResponse {
  data: FriendRequest[];
  total: number;
  currentPage: number;
  totalPages: number;
}

interface FriendRequestsProps {
  title: string;
  fetchFriends: (page: number) => Promise<PaginatedResponse>;
}

interface CardStates {
  [key: string]: {
    isAccept: boolean;
    isDecline: boolean;
    loading: boolean;
  };
}

export const FriendSuggests: React.FC<FriendRequestsProps> = ({
  title,
  fetchFriends,
}) => {
  const [friends, setFriends] = useState<FriendRequest[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { notify } = useNotification();
  const [cardStates, setCardStates] = useState<CardStates>({});
  // Ref for intersection observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadFriends = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await fetchFriends(page);

      setHasMore(page < response.totalPages);
      setCardStates((prevStates) => {
        const newStates = { ...prevStates };
        response.data.forEach((friend) => {
          if (!newStates[friend.id]) {
            newStates[friend.id] = {
              isAccept: false,
              isDecline: false,
              loading: false,
            };
          }
        });
        return newStates;
      });
      setFriends((prevFriends) => [...prevFriends, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading friends:", error);
      notify("error", {
        message: "Error loading friends",
      });
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, fetchFriends, notify]);

  // Set up intersection observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        loadFriends();
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);
    observerRef.current = observer;

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadFriends]);

  const handleInvitation = useCallback(
    async (id: string) => {
      setCardStates((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          loading: true,
        },
      }));

      try {
        await friendService.sendInvitation(id);

        setCardStates((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            isAccept: true,
          },
        }));
      } catch (error) {
        notify("error", {
          message: "Không thể gửi lời mời kết bạn",
        });
      } finally {
        setCardStates((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            loading: false,
          },
        }));
      }
    },
    [notify]
  );

  const handleRemove = useCallback(async (id: string) => {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.id !== id)
    );
  }, []);

  return (
    <div className="w-full py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {friends && friends.length > 0 ? (
        <FriendGrid
          titleAccept="Kết bạn"
          titleDecline="Gỡ"
          titleAccepted="Đã gửi lời mời ..."
          titleDeclined="Đã gỡ ..."
          friends={friends}
          getCardState={(id: string) =>
            cardStates[id] || {
              isAccept: false,
              isDecline: false,
              loading: false,
            }
          }
          onAccept={handleInvitation}
          onDecline={handleRemove}
        />
      ) : (
        <Empty />
      )}
      <div ref={loadingRef} className="w-full flex justify-center py-4">
        {loading && <Spin />}
      </div>
    </div>
  );
};
