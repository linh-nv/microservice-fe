import { useState, useEffect, useCallback } from "react";

export const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (
      Math.ceil(scrollTop + clientHeight) >= scrollHeight - 100 &&
      !isFetching
    ) {
      setIsFetching(true);
    }
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
    setIsFetching(false);
  }, [isFetching, callback]);

  return { isFetching };
};
