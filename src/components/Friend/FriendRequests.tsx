import React, { useState, useCallback, useEffect } from "react";
import { Button, Spin } from "antd";
import { FriendGrid } from "./FriendGrid";
import { FriendRequest } from "../../types/friend";
import { useInfiniteScroll } from "../../hook/useInfiniteScroll";

interface FriendRequestsProps {
  title: string;
  fetchFriends: (page: number) => Promise<FriendRequest[]>;
  rowsPerLoad?: number;
  infiniteScroll?: boolean;
}

export const FriendRequests: React.FC<FriendRequestsProps> = ({
  title,
  fetchFriends,
  rowsPerLoad = 2,
  infiniteScroll = false,
}) => {
  // State management
  const [friends, setFriends] = useState<FriendRequest[]>([]);
  const [visibleFriends, setVisibleFriends] = useState<FriendRequest[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Tính toán số phần tử hiển thị trên mỗi hàng dựa vào kích thước màn hình
  const getItemsPerRow = () => {
    const width = window.innerWidth;
    if (width >= 1280) return 5; // xl
    if (width >= 1024) return 4; // lg
    if (width >= 768) return 3; // md
    return 2; // sm và xs
  };

  // Tính số phần tử tối đa hiển thị cho 2 hàng
  const getMaxVisibleItems = useCallback(() => {
    return getItemsPerRow() * rowsPerLoad;
  }, [rowsPerLoad]);

  // Cập nhật số phần tử hiển thị khi có thay đổi về kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      const maxItems = getMaxVisibleItems();
      setVisibleFriends(friends.slice(0, maxItems * page));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [friends, page, getMaxVisibleItems]);

  // Load dữ liệu ban đầu
  useEffect(() => {
    loadMoreFriends();
  }, []);

  // Cập nhật visibleFriends khi friends thay đổi
  useEffect(() => {
    const maxItems = getMaxVisibleItems();
    setVisibleFriends(friends.slice(0, maxItems * page));
  }, [friends, page, getMaxVisibleItems]);

  const loadMoreFriends = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newFriends = await fetchFriends(page);
      
      if (newFriends.length === 0) {
        setHasMore(false);
      } else {
        setFriends((prev) => [...prev, ...newFriends]);
      }
    } catch (error) {
      console.error("Error loading friends:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, fetchFriends]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // Hook infinite scroll cho phần gợi ý kết bạn
  const { isFetching } = useInfiniteScroll(
    infiniteScroll ? loadMoreFriends : () => {}
  );

  const handleAccept = async (id: string) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
    setVisibleFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  const handleDecline = async (id: string) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
    setVisibleFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  // Kiểm tra xem còn phần tử để hiển thị không
  const hasMoreToShow = visibleFriends.length < friends.length;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {friends.length > getMaxVisibleItems() && (
          <Button type="link" className="text-blue-600">
            Xem tất cả
          </Button>
        )}
      </div>

      <FriendGrid
        friends={visibleFriends}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />

      {!infiniteScroll && hasMoreToShow && (
        <div className="text-center mt-4">
          <Button
            onClick={handleLoadMore}
            loading={loading}
            className="bg-gray-100"
          >
            Xem thêm
          </Button>
        </div>
      )}

      {(loading || isFetching) && (
        <div className="text-center mt-4">
          <Spin />
        </div>
      )}
    </div>
  );
};
