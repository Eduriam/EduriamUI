import { AbsoluteFill, Audio, Sequence } from "remotion";

import React from "react";

import type { VideoComponent } from "../video-components/VideoComponent";
import type { IBackgroundColor } from "../video-components/components/BackgroundColor/BackgroundColor";
import { BackgroundColor } from "../video-components/components/BackgroundColor/BackgroundColor";
import type { IBackgroundImage } from "../video-components/components/BackgroundImage/BackgroundImage";
import { BackgroundImage } from "../video-components/components/BackgroundImage/BackgroundImage";
import {
  BackgroundVideo,
  IBackgroundVideo,
} from "../video-components/components/BackgroundVideo/BackgroundVideo";
import { VideoComponentFactory } from "../video-components/factory/VideoComponentFactory";
import type { Scene } from "../video-scenes/Scene";
import type { Slide } from "../video-slides/Slide";
import { RawSlide } from "../video-slides/raw-slide/RawSlide";
import { OneHeaderSlide } from "../video-slides/slide-templates/specific/OneHeaderSlide";
import type { Video } from "../video/Video";
import type { VideoDefinition } from "../video/VideoDefinition";

function materializeSlide(slide: Slide): VideoComponent[] {
  switch (slide.type) {
    case "RAW":
      return new RawSlide(slide.id, slide.components).getComponents();
    case "ONE_HEADER":
      return new OneHeaderSlide(slide).toComponents();
    default:
      return [];
  }
}

interface SceneRendererProps {
  scene: Scene;
  fps: number;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({ scene, fps }) => {
  const components = scene.slides.flatMap(materializeSlide);

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
      {scene.audio ? <Audio src={scene.audio.url} /> : null}

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
        const startMs = c.startTime ?? 0;
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

interface CompositionProps {
  scenes: Scene[];
  fps: number;
}

const Composition: React.FC<CompositionProps> = ({ scenes, fps }) => {
  let currentFrame = 0;

  return (
    <AbsoluteFill>
      {scenes.map((scene, idx) => {
        const sceneDurationFrames = Math.round((scene.duration / 1000) * fps);
        const sceneStartFrame = currentFrame;
        currentFrame += sceneDurationFrames;

        return (
          <Sequence
            key={scene.id ?? `scene-${idx}`}
            from={sceneStartFrame}
            durationInFrames={sceneDurationFrames}
          >
            <SceneRenderer scene={scene} fps={fps} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

/**
 * Static builder for Remotion video compositions.
 * Use {@link VideoBuilder.buildVideo} to create a {@link Video} from a {@link VideoDefinition}.
 */
export class VideoBuilder {
  /**
   * Builds a Remotion composition from a {@link VideoDefinition}.
   *
   * Iterates through scenes, materializes their slides into components,
   * calculates the total duration from individual scene durations,
   * and returns a {@link Video} ready for the Remotion Player.
   */
  static buildVideo(definition: VideoDefinition): Video {
    const { scenes, fps, videoWidth, videoHeight } = definition;

    const durationInFrames = scenes.reduce((total, scene) => {
      return total + Math.round((scene.duration / 1000) * fps);
    }, 0);

    const videoComponent: React.FC = () => (
      <Composition scenes={scenes} fps={fps} />
    );

    return {
      fps,
      videoWidth,
      videoHeight,
      durationInFrames,
      videoComponent,
    };
  }
}
