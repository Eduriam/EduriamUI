import { Player } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";

import React, { useMemo } from "react";

import { IRawSlide, RawSlide } from "./RawSlide";

interface RawSlideStoryProps {
  slide: IRawSlide;
}

const RawSlideStory: React.FC<RawSlideStoryProps> = ({ slide }) => {
  const fps = 30;
  const Component = useMemo(() => {
    const Comp: React.FC = () => <RawSlide slide={slide} fps={fps} />;
    return Comp;
  }, [slide]);

  return (
    <Player
      component={Component}
      durationInFrames={150}
      fps={fps}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{ width: "100%" }}
      controls
    />
  );
};

const meta: Meta<typeof RawSlideStory> = {
  title: "x/video-manager/video-slides/RawSlide",
  component: RawSlideStory,
};

export default meta;
type Story = StoryObj<typeof RawSlideStory>;

export const WithHeaderAndBackground: Story = {
  args: {
    slide: {
      id: "raw-1",
      type: "RAW",
      startTime: 0,
      backgroundComponents: [
        {
          id: "bg1",
          type: "BACKGROUND_COLOR",
          startTime: 0,
          color: "#0ea5e9",
        },
      ],
      components: [
        {
          id: "h1",
          type: "TEXT",
          startTime: 0,
          column: "first",
          text: "Raw Slide Demo",
        },
      ],
    },
  },
};

