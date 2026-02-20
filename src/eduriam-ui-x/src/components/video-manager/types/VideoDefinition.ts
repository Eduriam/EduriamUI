import type { SceneComponent } from "../components/SceneComponent";

/**
 * Input for RemotionVideoPlayer / VideoBuilder.buildVideo.
 */
export type VideoDefinition = {
  durationInFrames: number;
  fps: number;
  compositionWidth: number;
  compositionHeight: number;
  title?: string;
  components?: SceneComponent[];
  audioUrl?: string | null;
  audioDurationMs?: number;
  componentStartMs?: number[];
};
