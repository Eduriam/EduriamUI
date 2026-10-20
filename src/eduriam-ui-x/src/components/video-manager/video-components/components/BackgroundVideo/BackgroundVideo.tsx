import {
  Freeze,
  OffthreadVideo,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AbsoluteFill } from "remotion";

import React from "react";

import type { BackgroundVideoComponent } from "../../VideoComponent";

export interface IBackgroundVideo extends BackgroundVideoComponent {
  type: "BACKGROUND_VIDEO";
  url: string;
  assetId?: string;
  mediaDurationMs?: number;
}

export interface IBackgroundVideoProps {
  comp: IBackgroundVideo;
}

const BackgroundVideoContent: React.FC<IBackgroundVideoProps> = ({ comp }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (comp.mediaDurationMs && comp.mediaDurationMs > 0) {
    const last = Math.max(
      0,
      Math.ceil((comp.mediaDurationMs / 1000) * fps) - 1,
    );
    return (
      <Freeze frame={last} active={frame >= last}>
        <OffthreadVideo
          src={comp.url}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Freeze>
    );
  }
  return (
    <AbsoluteFill>
      <video
        src={comp.url}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        autoPlay
        loop
        muted
      />
    </AbsoluteFill>
  );
};

export const BackgroundVideo: React.FC<IBackgroundVideoProps> = ({ comp }) => {
  const { fps } = useVideoConfig();
  return (
    <Sequence from={Math.round((comp.startTime * fps) / 1000)} layout="none">
      <BackgroundVideoContent comp={comp} />
    </Sequence>
  );
};
export default BackgroundVideo;
