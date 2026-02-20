import { useCallback, useEffect, useRef, useState } from "react";

export type TransitionDirection = "forward" | "back";

const TRANSITION_DURATION_MS = 300;

/**
 * Manages slide-transition state for study session page navigation.
 *
 * Call `triggerTransition` to start a two-phase animation: the content
 * slides off-screen, the `onMidpoint` callback fires (to swap the index),
 * then the content slides back in from the opposite side.
 */
export const useStudySessionTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<TransitionDirection>("forward");
  const midpointRef = useRef<ReturnType<typeof setTimeout>>();
  const endRef = useRef<ReturnType<typeof setTimeout>>();
  const activeRef = useRef(false);

  useEffect(() => {
    return () => {
      clearTimeout(midpointRef.current);
      clearTimeout(endRef.current);
    };
  }, []);

  const triggerTransition = useCallback(
    (onMidpoint: () => void, dir: TransitionDirection) => {
      if (activeRef.current) return;
      activeRef.current = true;

      setDirection(dir);
      setIsTransitioning(true);

      clearTimeout(midpointRef.current);
      clearTimeout(endRef.current);

      midpointRef.current = setTimeout(onMidpoint, TRANSITION_DURATION_MS / 2);
      endRef.current = setTimeout(() => {
        activeRef.current = false;
        setIsTransitioning(false);
      }, TRANSITION_DURATION_MS);
    },
    [],
  );

  return {
    triggerTransition,
    isTransitioning,
    direction,
    transitionDurationMs: TRANSITION_DURATION_MS,
  };
};
