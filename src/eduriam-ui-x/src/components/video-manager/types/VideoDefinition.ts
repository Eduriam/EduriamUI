import type { VideoComponent } from "../video-components/VideoComponent";

/**
 * Input for RemotionVideoPlayer / VideoBuilder.buildVideo.
 */
export type VideoDefinition = {
  durationInFrames: number;
  fps: number;
  compositionWidth: number;
  compositionHeight: number;
  title?: string;
  components?: VideoComponent[];
  audioUrl?: string | null;
  audioDurationMs?: number;
  componentStartMs?: number[];
};
