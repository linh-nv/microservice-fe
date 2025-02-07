import { useEffect, useCallback } from "react";

export const useInfiniteScroll = (
  onLoadMore: () => void,
  options = {
    threshold: 0.8,
    root: null,
  }
) => {
  const handleScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        onLoadMore();
      }
    },
    [onLoadMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, options);
    const sentinel = document.getElementById("scroll-sentinel");

    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [handleScroll, options]);
};
