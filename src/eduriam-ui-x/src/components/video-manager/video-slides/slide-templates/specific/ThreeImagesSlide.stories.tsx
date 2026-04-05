import { Player } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";

import React, { useMemo } from "react";

import { IThreeImagesSlide, ThreeImagesSlide } from "./ThreeImagesSlide";

interface ThreeImagesSlideStoryProps {
  slide: IThreeImagesSlide;
}

const ThreeImagesSlideStory: React.FC<ThreeImagesSlideStoryProps> = ({
  slide,
}) => {
  const fps = 30;
  const Component = useMemo(() => {
    const Comp: React.FC = () => <ThreeImagesSlide slide={slide} fps={fps} />;
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

const meta: Meta<typeof ThreeImagesSlideStory> = {
  title: "x/video-manager/video-slides/ThreeImagesSlide",
  component: ThreeImagesSlideStory,
};

export default meta;
type Story = StoryObj<typeof ThreeImagesSlideStory>;

export const Default: Story = {
  args: {
    slide: {
      id: "three-images-1",
      type: "THREE_IMAGES",
      leftImage: {
        id: "left-image-1",
        startTime: 0,
        url: "https://placehold.co/600x400/0ea5e9/white?text=Left",
      },
      middleImage: {
        id: "middle-image-1",
        startTime: 500,
        url: "https://placehold.co/600x400/10b981/white?text=Middle",
      },
      rightImage: {
        id: "right-image-1",
        startTime: 1000,
        url: "https://placehold.co/600x400/f59e0b/white?text=Right",
      },
    },
  },
};
