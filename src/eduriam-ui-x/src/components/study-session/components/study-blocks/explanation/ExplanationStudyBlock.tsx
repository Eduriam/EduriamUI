import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Box, useMediaQuery } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

import type { Scene, VideoDefinition } from "../../../../video-manager";
import { DEFAULT_VIDEO_FPS } from "../../../../video-manager";
import { VideoPlayer } from "../../../../video-manager/video-player/VideoPlayer";

export interface IExplanationStudyBlock {
  scenes: Scene[];
  /** Called when the video finishes playing. */
  onComplete: () => void;
}

const VIDEO_ASPECT_RATIO = 16 / 9;

/**
 * Measures the available height from the element's top edge to the bottom of
 * the viewport. Re-measures on resize / scroll so the value stays accurate
 * even when surrounding layout changes (e.g. appbar, progress bar).
 */
function useAvailableHeight(ref: React.RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function measure() {
      const top = el!.getBoundingClientRect().top;
      setHeight(Math.round(window.innerHeight - top));
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ref]);

  return height;
}

export const ExplanationStudyBlock: React.FC<IExplanationStudyBlock> = ({
  scenes,
  onComplete,
}) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const containerRef = useRef<HTMLDivElement>(null);
  const availableHeight = useAvailableHeight(containerRef);

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      if (w > 0) setContainerWidth(w);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const videoDefinition: VideoDefinition | null = useMemo(() => {
    if (containerWidth <= 0) return null;

    const videoWidth = containerWidth;
    const videoHeight = desktop
      ? Math.round(containerWidth / VIDEO_ASPECT_RATIO)
      : availableHeight > 0
        ? availableHeight
        : Math.round(containerWidth / VIDEO_ASPECT_RATIO);

    return {
      scenes,
      fps: DEFAULT_VIDEO_FPS,
      videoWidth,
      videoHeight,
    };
  }, [scenes, containerWidth, availableHeight, desktop]);

  const handleEnded = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        ...(desktop
          ? { aspectRatio: `${VIDEO_ASPECT_RATIO}` }
          : {
              height: availableHeight > 0 ? availableHeight : undefined,
            }),
      }}
    >
      {videoDefinition && (
        <VideoPlayer
          videoDefinition={videoDefinition}
          onEnded={handleEnded}
          autoPlay
          controls
          style={
            desktop
              ? undefined
              : { width: "100%", height: "100%" }
          }
        />
      )}
    </Box>
  );
};
