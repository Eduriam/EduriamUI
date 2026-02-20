import { AbsoluteFill, Audio, Sequence, useVideoConfig } from "remotion";

import React from "react";

import type { VideoDefinition } from "./types/VideoDefinition";
import type { VideoComponent } from "./video-components/VideoComponent";
import type { IBackgroundColor } from "./video-components/components/BackgroundColor/BackgroundColor";
import { BackgroundColor } from "./video-components/components/BackgroundColor/BackgroundColor";
import type { IBackgroundImage } from "./video-components/components/BackgroundImage/BackgroundImage";
import { BackgroundImage } from "./video-components/components/BackgroundImage/BackgroundImage";
import {
  BackgroundVideo,
  IBackgroundVideo,
} from "./video-components/components/BackgroundVideo/BackgroundVideo";
import { VideoComponentFactory } from "./video-components/factory/VideoComponentFactory";

interface CompositionProps {
  components: VideoComponent[];
  audioUrl?: string | null;
  componentStartMs?: number[];
}

const Composition: React.FC<CompositionProps> = ({
  components,
  audioUrl,
  componentStartMs = [],
}) => {
  const { fps } = useVideoConfig();

  const bg = components.find((c) => c.type === "BACKGROUND_COLOR") as
    | IBackgroundColor
    | undefined;
  const bgImg = components.find((c) => c.type === "BACKGROUND_IMAGE") as
    | IBackgroundImage
    | undefined;
  const bgVid = components.find((c) => c.type === "BACKGROUND_VIDEO") as
    | IBackgroundVideo
    | undefined;

  const others = components
    .filter(
      (c) =>
        c.type !== "BACKGROUND_COLOR" &&
        c.type !== "BACKGROUND_IMAGE" &&
        c.type !== "BACKGROUND_VIDEO",
    )
    .sort((a, b) => {
      const ai = (a as { id?: string }).id ?? "";
      const bi = (b as { id?: string }).id ?? "";
      return ai.localeCompare(bi);
    });

  return (
    <AbsoluteFill>
      {audioUrl ? <Audio src={audioUrl} /> : null}

      {bg ? (
        <BackgroundColor comp={bg} />
      ) : bgImg ? (
        <BackgroundImage comp={bgImg} />
      ) : bgVid ? (
        <BackgroundVideo comp={bgVid} />
      ) : (
        <AbsoluteFill style={{ backgroundColor: "black" }} />
      )}

      {others.map((c, idx) => {
        const startMs = componentStartMs[idx] ?? 0;
        const startFrame = Math.max(0, Math.round((startMs / 1000) * fps));
        const key = (c as { id?: string }).id ?? `comp-${idx}`;
        return (
          <Sequence key={key} from={startFrame}>
            {VideoComponentFactory.renderComponent(c)}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export interface VideoBuilderResult {
  Component: React.FC;
  durationInFrames: number;
  fps: number;
  compositionWidth: number;
  compositionHeight: number;
}

/**
 * Static builder for Remotion video compositions.
 * Use {@link VideoBuilder.buildVideo} to create a composition from a {@link VideoDefinition}.
 */
export class VideoBuilder {
  /**
   * Builds a Remotion composition from a `VideoDefinition`.
   *
   * Returns the composition React component together with the metadata
   * required by the Remotion Player (duration, fps, dimensions).
   */
  static buildVideo(definition: VideoDefinition): VideoBuilderResult {
    const {
      durationInFrames,
      fps,
      compositionWidth,
      compositionHeight,
      components = [],
      audioUrl,
      componentStartMs,
    } = definition;

    const Component: React.FC = () => (
      <Composition
        components={components}
        audioUrl={audioUrl}
        componentStartMs={componentStartMs}
      />
    );

    return {
      Component,
      durationInFrames,
      fps,
      compositionWidth,
      compositionHeight,
    };
  }
}
