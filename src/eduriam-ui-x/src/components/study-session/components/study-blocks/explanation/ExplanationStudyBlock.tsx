import { LargeButton } from "@eduriam/ui-core";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Box, useMediaQuery } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

import type {
  Caption,
  Scene,
  VideoDefinition,
} from "../../../../video-manager";
import { DEFAULT_VIDEO_FPS } from "../../../../video-manager";
import { VideoPlayer } from "../../../../video-manager/video-player/VideoPlayer";
import type { StudySessionDataTest } from "../../../types/StudySessionDataTest";
import type { StudySessionLocalization } from "../../../types/StudySessionLocalization";

export interface IExplanationStudyBlock {
  scenes: Scene[];
  onComplete: () => void;
  localization: StudySessionLocalization;
  dataTest?: StudySessionDataTest;
}

const VIDEO_ASPECT_RATIO = 16 / 9;

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
  localization,
  dataTest,
}) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const containerRef = useRef<HTMLDivElement>(null);
  const availableHeight = useAvailableHeight(containerRef);

  const [containerWidth, setContainerWidth] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);

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

  const captions = useMemo<Caption[]>(() => {
    const result: Caption[] = [];
    let offsetMs = 0;

    for (const scene of scenes) {
      const sceneCaptions = scene.audio?.captions ?? [];
      for (const caption of sceneCaptions) {
        result.push({
          ...caption,
          startMs: caption.startMs + offsetMs,
          endMs: caption.endMs + offsetMs,
          timestampMs:
            caption.timestampMs === null
              ? null
              : caption.timestampMs + offsetMs,
        });
      }
      offsetMs += scene.duration;
    }

    return result;
  }, [scenes]);

  const handleEnded = useCallback(() => {
    setHasFinished(true);
    onComplete();
  }, [onComplete]);

  return (
    <>
      <Box
        ref={containerRef}
        data-test={dataTest?.explanationBlock?.section}
        sx={{
          width: "100%",
          position: "relative",
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
            captions={captions}
            autoPlay
            onEnded={handleEnded}
            style={desktop ? undefined : { width: "100%", height: "100%" }}
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 2.5,
        }}
      >
        <LargeButton
          onClick={onComplete}
          disabled={!hasFinished}
          fullWidth
          data-test={dataTest?.explanationBlock?.continueButton}
        >
          {localization.studyBlock.continueButton}
        </LargeButton>
      </Box>
    </>
  );
};
