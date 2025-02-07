import React, { useState, useCallback, useEffect, useRef } from "react";
import { Spin } from "antd";
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
}

export const FriendSuggests: React.FC<FriendRequestsProps> = ({
  title,
  fetchFriends,
}) => {
  // State management for friends data and pagination
  const [friends, setFriends] = useState<FriendRequest[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { notify } = useNotification();

  // Ref for intersection observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Load more data when scrolling
  const loadFriends = useCallback(async () => {
    // Prevent API calls when loading or no more data
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await fetchFriends(page);

      setHasMore(page < response.totalPages);

      // Append new data to existing friends
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

    // Create new observer
    const observer = new IntersectionObserver(handleObserver, options);
    observerRef.current = observer;

    // Observe loading div if it exists
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadFriends]);

  // Handle friend request actions
  const handleAccept = useCallback(async (id: string) => {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.id !== id)
    );
  }, []);

  const handleDecline = useCallback(async (id: string) => {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.id !== id)
    );
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <FriendGrid
        friends={friends}
        titleAccept={'Kết bạn'}
        titleDecline={'Xóa'}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />

      {/* Loading indicator */}
      <div ref={loadingRef} className="w-full flex justify-center py-4">
        {loading && <Spin />}
      </div>
    </div>
  );
};
