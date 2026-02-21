import { Player, type PlayerRef } from "@remotion/player";

import React, { useEffect, useMemo, useRef } from "react";

import { VideoBuilder } from "../video-builder/VideoBuilder";
import type { VideoDefinition } from "../video/VideoDefinition";
import styles from "./VideoPlayer.module.css";

export interface IVideoPlayer {
  /** The video definition that describes what to render. */
  videoDefinition: VideoDefinition;
  /** Fired once when the video reaches the end (requires looping to be off). */
  onEnded?: () => void;
  /** Whether to start playing immediately. */
  autoPlay?: boolean;
  /** Whether to show playback controls. @default true */
  controls?: boolean;
  /** Optional style for the player container (e.g. height: "100%" to fill parent). */
  style?: React.CSSProperties;
}

/**
 * Renders a Remotion `<Player>` driven by a {@link VideoDefinition}.
 *
 * Uses {@link VideoBuilder.buildVideo} internally to construct the composition component and
 * metadata, then passes them to the Remotion Player for in-browser playback.
 */
export const VideoPlayer: React.FC<IVideoPlayer> = ({
  videoDefinition,
  onEnded,
  autoPlay = false,
  controls: showControls = true,
  style: styleProp,
}) => {
  const playerRef = useRef<PlayerRef>(null);

  const { videoComponent, durationInFrames, fps, videoWidth, videoHeight } =
    useMemo(() => VideoBuilder.buildVideo(videoDefinition), [videoDefinition]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !onEnded) return;

    player.addEventListener("ended", onEnded);
    return () => {
      player.removeEventListener("ended", onEnded);
    };
  }, [onEnded]);

  if (!durationInFrames || !fps || !videoWidth || !videoHeight) {
    throw new Error(
      "RemotionVideoPlayer: definition is missing required fields (durationInFrames, fps, videoWidth, videoHeight).",
    );
  }

  return (
    <Player
      ref={playerRef}
      component={videoComponent}
      durationInFrames={durationInFrames}
      fps={fps}
      compositionWidth={videoWidth}
      compositionHeight={videoHeight}
      style={{ width: "100%", ...styleProp }}
      controls={showControls}
      autoPlay={autoPlay}
      allowFullscreen={false}
      className={styles.hideTime}
      acknowledgeRemotionLicense={true}
    />
  );
};

export default VideoPlayer;
