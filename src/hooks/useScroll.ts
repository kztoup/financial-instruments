import { useEffect, useRef, useState, useCallback } from "react";

/**
 * A hook that provides the current scrollTop value and a throttled scroll handler.
 *
 * @returns An object containing:
 * - `scrollTop`: current scroll position (number)
 * - `onScroll`: scroll event handler to attach to a scrollable element
 */

const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(0);

  const rafRef = useRef<number | null>(null);
  const latestScrollTop = useRef(0);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    latestScrollTop.current = e.currentTarget.scrollTop;

    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      setScrollTop(latestScrollTop.current);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { scrollTop, onScroll };
};

export default useScroll;
