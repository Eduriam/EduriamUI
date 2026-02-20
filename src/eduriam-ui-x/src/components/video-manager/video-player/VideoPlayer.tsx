import { Player } from "@remotion/player";

import React, { useMemo } from "react";

import { VideoBuilder } from "../video-builder/VideoBuilder";
import type { VideoDefinition } from "../video/VideoDefinition";

export interface IVideoPlayer {
  /** The video definition that describes what to render. */
  videoDefinition: VideoDefinition;
}

/**
 * Renders a Remotion `<Player>` driven by a {@link VideoDefinition}.
 *
 * Uses {@link VideoBuilder.buildVideo} internally to construct the composition component and
 * metadata, then passes them to the Remotion Player for in-browser playback.
 */
export const VideoPlayer: React.FC<IVideoPlayer> = ({ videoDefinition }) => {
  const { videoComponent, durationInFrames, fps, videoWidth, videoHeight } =
    useMemo(() => VideoBuilder.buildVideo(videoDefinition), [videoDefinition]);

  if (!durationInFrames || !fps || !videoWidth || !videoHeight) {
    throw new Error(
      "RemotionVideoPlayer: definition is missing required fields (durationInFrames, fps, videoWidth, videoHeight).",
    );
  }

  return (
    <Player
      component={videoComponent}
      durationInFrames={durationInFrames}
      fps={fps}
      compositionWidth={videoWidth}
      compositionHeight={videoHeight}
      style={{ width: "100%" }}
      controls={true}
    />
  );
};

export default VideoPlayer;
