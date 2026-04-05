import { Player } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";

import React, { useMemo } from "react";

import { IOneImageSlide, OneImageSlide } from "./OneImageSlide";

interface OneImageSlideStoryProps {
  slide: IOneImageSlide;
}

const OneImageSlideStory: React.FC<OneImageSlideStoryProps> = ({ slide }) => {
  const fps = 30;
  const Component = useMemo(() => {
    const Comp: React.FC = () => <OneImageSlide slide={slide} fps={fps} />;
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

const meta: Meta<typeof OneImageSlideStory> = {
  title: "x/video-manager/video-slides/OneImageSlide",
  component: OneImageSlideStory,
};

export default meta;
type Story = StoryObj<typeof OneImageSlideStory>;

export const Default: Story = {
  args: {
    slide: {
      id: "one-image-1",
      type: "ONE_IMAGE",
      startTime: 0,
      image: {
        id: "one-image-content-1",
        startTime: 0,
        url: "https://placehold.co/900x600/0ea5e9/white?text=One+Image",
      },
    },
  },
};
