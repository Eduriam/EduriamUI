import { Player, type PlayerRef } from "@remotion/player";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Box } from "@mui/material";

import { VideoBuilder } from "../video-builder/VideoBuilder";
import type { VideoDefinition } from "../video/VideoDefinition";
import styles from "./VideoPlayer.module.css";
import {
  VideoOverlayControls,
  type VideoPlaybackState,
} from "./components/VideoOverlayControls";

export type { PlayerRef } from "@remotion/player";
export type { VideoPlaybackState } from "./components/VideoOverlayControls";

const HOVER_HIDE_DELAY_MS = 2500;

export interface IVideoPlayer {
  /** The video definition that describes what to render. */
  videoDefinition: VideoDefinition;
  /** Whether to start playing immediately. @default false */
  autoPlay?: boolean;
  /** Optional style for the player container (e.g. height: "100%" to fill parent). */
  style?: React.CSSProperties;
  /** Fired when the video reaches the end. */
  onEnded?: () => void;
}

/**
 * Renders a Remotion `<Player>` with built-in overlay controls
 * (play / pause / replay, mute, progress bar with seek).
 */
export const VideoPlayer: React.FC<IVideoPlayer> = ({
  videoDefinition,
  autoPlay = false,
  style: styleProp,
  onEnded,
}) => {
  const playerRef = useRef<PlayerRef>(null);

  const { videoComponent, durationInFrames, fps, videoWidth, videoHeight } =
    useMemo(() => VideoBuilder.buildVideo(videoDefinition), [videoDefinition]);

  const [playbackState, setPlaybackState] = useState<VideoPlaybackState>(
    autoPlay ? "playing" : "paused",
  );
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Subscribe to Remotion player events.
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onFrame = () => {
      const frame = player.getCurrentFrame();
      setProgress(durationInFrames > 0 ? (frame / durationInFrames) * 100 : 0);
    };

    const onPlay = () => setPlaybackState("playing");
    const onPause = () => {
      setPlaybackState((prev) => (prev === "ended" ? prev : "paused"));
    };
    const handleEnded = () => {
      setPlaybackState("ended");
      setProgress(100);
      onEnded?.();
    };

    player.addEventListener("frameupdate", onFrame);
    player.addEventListener("play", onPlay);
    player.addEventListener("pause", onPause);
    player.addEventListener("ended", handleEnded);

    return () => {
      player.removeEventListener("frameupdate", onFrame);
      player.removeEventListener("play", onPlay);
      player.removeEventListener("pause", onPause);
      player.removeEventListener("ended", handleEnded);
    };
  }, [durationInFrames, videoDefinition, onEnded]);

  // Sync mute state with the player.
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isMuted) player.mute();
    else player.unmute();
  }, [isMuted]);

  // ---------------------------------------------------------------------------
  // Playback handlers
  // ---------------------------------------------------------------------------

  const handlePlayPause = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (playbackState === "playing") player.pause();
    else player.play();
  }, [playbackState]);

  const handleRestart = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.seekTo(0);
    player.play();
    setPlaybackState("playing");
  }, []);

  const handleSeek = useCallback(
    (fraction: number) => {
      const player = playerRef.current;
      if (!player) return;
      player.seekTo(Math.round(fraction * durationInFrames));
      if (playbackState === "ended") {
        setPlaybackState("paused");
      }
    },
    [durationInFrames, playbackState],
  );

  const handleMuteToggle = useCallback(() => setIsMuted((prev) => !prev), []);

  // ---------------------------------------------------------------------------
  // Hover logic
  // ---------------------------------------------------------------------------

  const handleMouseEnter = useCallback(() => {
    clearTimeout(hoverTimerRef.current);
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hoverTimerRef.current);
    setHovered(false);
  }, []);

  const handleMouseMove = useCallback(() => {
    if (playbackState !== "playing") return;
    setHovered(true);
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(
      () => setHovered(false),
      HOVER_HIDE_DELAY_MS,
    );
  }, [playbackState]);

  useEffect(() => () => clearTimeout(hoverTimerRef.current), []);

  const handleVideoClick = useCallback(() => {
    if (playbackState === "ended") return;
    handlePlayPause();
  }, [playbackState, handlePlayPause]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!durationInFrames || !fps || !videoWidth || !videoHeight) {
    throw new Error(
      "RemotionVideoPlayer: definition is missing required fields (durationInFrames, fps, videoWidth, videoHeight).",
    );
  }

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleVideoClick}
      sx={{
        position: "relative",
        cursor: "pointer",
        width: "100%",
        ...styleProp,
      }}
    >
      <Player
        ref={playerRef as React.RefObject<PlayerRef>}
        component={videoComponent}
        durationInFrames={durationInFrames}
        fps={fps}
        compositionWidth={videoWidth}
        compositionHeight={videoHeight}
        style={{ width: "100%", ...styleProp }}
        controls={false}
        autoPlay={autoPlay}
        clickToPlay={false}
        allowFullscreen={false}
        className={styles.hideTime}
        acknowledgeRemotionLicense={true}
      />

      <VideoOverlayControls
        playbackState={playbackState}
        progress={progress}
        isMuted={isMuted}
        visible={hovered}
        onPlayPause={handlePlayPause}
        onRestart={handleRestart}
        onMuteToggle={handleMuteToggle}
        onSeek={handleSeek}
      />
    </Box>
  );
};

export default VideoPlayer;
