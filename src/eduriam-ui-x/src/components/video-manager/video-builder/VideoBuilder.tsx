import { AbsoluteFill, Audio, Sequence } from "remotion";

import React from "react";

import type { Scene } from "../video-scenes/Scene";
import { SlideFactory } from "../video-slides/factory/SlideFactory";
import type { Video } from "../video/Video";
import type { VideoDefinition } from "../video/VideoDefinition";

interface SceneRendererProps {
  scene: Scene;
  fps: number;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({ scene, fps }) => (
  <AbsoluteFill>
    {scene.audio ? <Audio src={scene.audio.url} /> : null}
    {scene.slides.map((slide) => (
      <AbsoluteFill key={slide.id}>
        {SlideFactory.renderSlide(slide, fps)}
      </AbsoluteFill>
    ))}
  </AbsoluteFill>
);

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
   * Iterates through scenes, delegates slide rendering to {@link SlideFactory},
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
