import { useEffect, useRef } from "react";

interface UseSwipeNavigationOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  /** Minimum horizontal distance in px to register a swipe. @default 50 */
  threshold?: number;
  /** Set to `false` to detach listeners (e.g. on desktop). @default true */
  enabled?: boolean;
}

/**
 * Detects horizontal swipe gestures on the document and invokes the
 * appropriate callback.  Only fires when horizontal movement exceeds
 * vertical movement and the configured threshold.
 */
export const useSwipeNavigation = ({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  enabled = true,
}: UseSwipeNavigationOptions) => {
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const callbacksRef = useRef({ onSwipeLeft, onSwipeRight });
  callbacksRef.current = { onSwipeLeft, onSwipeRight };

  useEffect(() => {
    if (!enabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startRef.current.x;
      const dy = touch.clientY - startRef.current.y;
      startRef.current = null;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        if (dx < 0) {
          callbacksRef.current.onSwipeLeft();
        } else {
          callbacksRef.current.onSwipeRight();
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, threshold]);
};
