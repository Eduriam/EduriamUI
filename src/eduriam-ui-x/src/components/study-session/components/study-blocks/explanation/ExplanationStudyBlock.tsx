import { IconButton, LargeButton } from "@eduriam/ui-core";

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
  onReportClick?: () => void;
  localization: StudySessionLocalization;
  isRevisiting?: boolean;
  pauseVideo?: boolean;
  dataTest?: StudySessionDataTest;
}

const VIDEO_ASPECT_RATIO = 16 / 9;

function useAvailableHeight(ref: React.RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const initialEl = ref.current;
    if (!initialEl) return;

    function measure() {
      const el = ref.current;
      if (!el) return;

      const { top } = el.getBoundingClientRect();
      const parentBottom =
        el.parentElement?.getBoundingClientRect().bottom ?? window.innerHeight;
      setHeight(Math.round(Math.max(0, parentBottom - top)));
    }

    measure();
    const parentObserver = initialEl.parentElement
      ? new ResizeObserver(() => measure())
      : null;
    if (parentObserver && initialEl.parentElement) {
      parentObserver.observe(initialEl.parentElement);
    }

    window.addEventListener("resize", measure);
    return () => {
      parentObserver?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref]);

  return height;
}

function useElementHeight(ref: React.RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setHeight(Math.round(el.getBoundingClientRect().height));
    measure();

    const observer = new ResizeObserver(() => measure());
    observer.observe(el);

    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref]);

  return height;
}

export const ExplanationStudyBlock: React.FC<IExplanationStudyBlock> = ({
  scenes,
  onComplete,
  onReportClick,
  localization,
  isRevisiting = false,
  pauseVideo = false,
  dataTest,
}) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const containerRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const availableHeight = useAvailableHeight(containerRef);
  const actionsHeight = useElementHeight(actionsRef);

  const [containerWidth, setContainerWidth] = useState(0);
  const [hasFinished, setHasFinished] = useState(isRevisiting);

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

  const mobileVideoHeight = useMemo(() => {
    if (availableHeight <= 0) return 0;
    if (actionsHeight <= 0) return availableHeight;
    return Math.max(0, availableHeight - actionsHeight);
  }, [availableHeight, actionsHeight]);

  const videoDefinition: VideoDefinition | null = useMemo(() => {
    if (containerWidth <= 0) return null;

    const videoWidth = containerWidth;
    const videoHeight = desktop
      ? Math.round(containerWidth / VIDEO_ASPECT_RATIO)
      : mobileVideoHeight > 0
        ? mobileVideoHeight
        : Math.round(containerWidth / VIDEO_ASPECT_RATIO);

    return {
      scenes,
      fps: DEFAULT_VIDEO_FPS,
      videoWidth,
      videoHeight,
    };
  }, [scenes, containerWidth, mobileVideoHeight, desktop]);

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
                height: mobileVideoHeight > 0 ? mobileVideoHeight : undefined,
              }),
        }}
      >
        {videoDefinition && (
          <VideoPlayer
            videoDefinition={videoDefinition}
            captions={captions}
            autoPlay
            paused={pauseVideo}
            onEnded={handleEnded}
            style={desktop ? undefined : { width: "100%", height: "100%" }}
          />
        )}
      </Box>

      <Box
        ref={actionsRef}
        sx={{ display: "flex", justifyContent: "center", pt: 2.5 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            maxWidth: 400,
          }}
        >
          {hasFinished && onReportClick && (
            <IconButton
              icon="report"
              variant="text"
              color="textSecondary"
              size="small"
              onClick={onReportClick}
              data-test={dataTest?.explanationBlock?.reportButton}
            />
          )}
          <LargeButton
            onClick={onComplete}
            disabled={!hasFinished}
            fullWidth
            data-test={dataTest?.explanationBlock?.continueButton}
          >
            {localization.studyBlock.continueButton}
          </LargeButton>
        </Box>
      </Box>
    </>
  );
};
