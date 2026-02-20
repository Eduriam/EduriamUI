import { Player } from "@remotion/player";

import React, { useMemo } from "react";

import type { VideoDefinition } from "../types/VideoDefinition";
import { VideoBuilder } from "../video-builder/VideoBuilder";

export interface IRemotionVideoPlayer {
  /** The video definition that describes what to render. */
  videoDefinition: VideoDefinition;
}

/**
 * Renders a Remotion `<Player>` driven by a `VideoDefinition`.
 *
 * Uses {@link VideoBuilder.buildVideo} internally to construct the composition component and
 * metadata, then passes them to the Remotion Player for in-browser playback.
 */
export const RemotionVideoPlayer: React.FC<IRemotionVideoPlayer> = ({
  videoDefinition,
}) => {
  const {
    Component,
    durationInFrames,
    fps,
    compositionWidth,
    compositionHeight,
  } = useMemo(
    () => VideoBuilder.buildVideo(videoDefinition),
    [videoDefinition],
  );

  if (!durationInFrames || !fps || !compositionWidth || !compositionHeight) {
    throw new Error(
      "RemotionVideoPlayer: definition is missing required fields (durationInFrames, fps, compositionWidth, compositionHeight).",
    );
  }

  return (
    <Player
      component={Component}
      durationInFrames={durationInFrames}
      fps={fps}
      compositionWidth={compositionWidth}
      compositionHeight={compositionHeight}
      style={{ width: "100%" }}
    />
  );
};

export default RemotionVideoPlayer;
