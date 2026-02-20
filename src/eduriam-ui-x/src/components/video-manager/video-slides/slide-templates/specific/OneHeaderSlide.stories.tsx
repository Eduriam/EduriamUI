import { Player } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";

import React, { useMemo } from "react";

import { IOneHeaderSlide, OneHeaderSlide } from "./OneHeaderSlide";

interface OneHeaderSlideStoryProps {
  slide: IOneHeaderSlide;
}

const OneHeaderSlideStory: React.FC<OneHeaderSlideStoryProps> = ({ slide }) => {
  const fps = 30;
  const Component = useMemo(() => {
    const Comp: React.FC = () => <OneHeaderSlide slide={slide} fps={fps} />;
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

const meta: Meta<typeof OneHeaderSlideStory> = {
  title: "x/video-manager/video-slides/OneHeaderSlide",
  component: OneHeaderSlideStory,
};

export default meta;
type Story = StoryObj<typeof OneHeaderSlideStory>;

export const Default: Story = {
  args: {
    slide: {
      id: "oh-1",
      type: "ONE_HEADER",
      text: "Hello World!",
    },
  },
};
