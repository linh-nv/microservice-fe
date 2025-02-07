import React, { useState, useCallback, useEffect } from "react";
import { Button, Empty } from "antd";
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

interface FriendWaitAcceptProps {
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

export const FriendWaitAccept: React.FC<FriendWaitAcceptProps> = ({
  title,
  fetchFriends,
}) => {
  const [friends, setFriends] = useState<FriendRequest[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [cardStates, setCardStates] = useState<CardStates>({});
  const { notify } = useNotification();

  const loadFriends = useCallback(async () => {
    if (loading || (!hasMore && page > 0)) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const response = await fetchFriends(nextPage);

      setHasMore(nextPage < response.totalPages);
      setCardStates((prev) => {
        const newCardStates = { ...prev };
        response.data.forEach((friend) => {
          if (!newCardStates[friend.id]) {
            newCardStates[friend.id] = {
              isAccept: false,
              isDecline: false,
              loading: false,
            };
          }
        });
        return newCardStates;
      });
      setFriends((prevFriends) =>
        page === 0 ? response.data : [...prevFriends, ...response.data]
      );
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading friends:", error);
      notify("error", {
        message: "Không thể tải danh sách bạn bè",
      });
    } finally {
      setLoading(false);
    }
  }, [fetchFriends, notify, loading, hasMore, page]);

  useEffect(() => {
    if (page === 0) {
      loadFriends();
    }
  }, [loadFriends, page]);

  const handleDecline = useCallback(async (id: string) => {
    try {
      await friendService.deleteInvitation(id);
    } catch (error) {
      console.error(error);
    } finally {
      setCardStates((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isDecline: true,
        },
      }));
    }
  }, []);

  return (
    <div className="py-8 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {hasMore && (
          <Button type="link" className="text-blue-600">
            Xem tất cả
          </Button>
        )}
      </div>
      {friends && friends.length > 0 ? (
        <FriendGrid
          waiting={waiting}
          titleAccept="Đang chờ xác nhận"
          titleDecline="Hủy"
          titleAccepted="Đã chấp nhận"
          titleDeclined="Đã từ chối"
          friends={friends}
          getCardState={(id: string) =>
            cardStates[id] || {
              isAccept: false,
              isDecline: false,
              loading: false,
            }
          }
          onAccept={() => {}}
          onDecline={(id: string) => handleDecline(id)}
        />
      ) : (
        <Empty />
      )}
      {hasMore && (
        <div className="text-center mt-4">
          <Button
            onClick={loadFriends}
            loading={loading}
            className="bg-gray-100"
          >
            {loading ? "Đang tải..." : "Xem thêm"}
          </Button>
        </div>
      )}
    </div>
  );
};
