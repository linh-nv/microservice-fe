import React, { useState, useCallback, useEffect } from "react";
import { Button, Spin } from "antd";
import { FriendGrid } from "./FriendGrid";
import { FriendRequest } from "../../types/friend";
import { useNotification } from "../../hook/notify";

interface PaginatedResponse {
  data: FriendRequest[];
  total: number;
  currentPage: number;
  totalPages: number;
}

interface FriendRequestsProps {
  title: string;
  fetchFriends: (page: number) => Promise<PaginatedResponse>;
  rowsPerLoad?: number;
  infiniteScroll?: boolean;
}

export const FriendRequests: React.FC<FriendRequestsProps> = ({
  title,
  fetchFriends,
}) => {
  // State management for friends data and pagination
  const [friends, setFriends] = useState<FriendRequest[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { notify } = useNotification();
  // Xử lý load thêm dữ liệu
  const loadFriends = useCallback(async () => {
    // Ngăn việc gọi API khi đang loading hoặc đã hết dữ liệu
    if (loading || page > totalPages) return;

    setLoading(true);

    try {
      const response = await fetchFriends(page);

      setTotalPages(response.totalPages);
      setHasMore(page < response.totalPages);
      setFriends(response.data);
      setPage(page + 1);
    } catch (error) {
      console.error("Error loading friends:", error);
      notify("error", {
        message: "Error loading friends",
      });
    } finally {
      setLoading(false);
    }
  }, [page, loading, totalPages, fetchFriends]);

  // Load dữ liệu ban đầu
  useEffect(() => {
    loadFriends();
  }, []);

  // Xử lý các hành động với friend request
  const handleAccept = async (id: string) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  const handleDecline = async (id: string) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {hasMore && (
          <Button type="link" className="text-blue-600">
            Xem tất cả
          </Button>
        )}
      </div>

      <FriendGrid
        titleAccept={"Xác nhận"}
        titleDecline={"Xóa"}
        friends={friends}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />

      {hasMore && (
        <div className="text-center mt-4">
          <Button
            onClick={loadFriends}
            loading={loading}
            className="bg-gray-100"
          >
            Xem thêm
          </Button>
        </div>
      )}

      {loading && (
        <div className="text-center mt-4">
          <Spin />
        </div>
      )}
    </div>
  );
};
