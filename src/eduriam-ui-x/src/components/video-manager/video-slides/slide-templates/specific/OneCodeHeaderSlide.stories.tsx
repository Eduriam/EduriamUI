import { Player } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";

import React, { useMemo } from "react";

import {
  IOneCodeHeaderSlide,
  OneCodeHeaderSlide,
} from "./OneCodeHeaderSlide";

interface OneCodeHeaderSlideStoryProps {
  slide: IOneCodeHeaderSlide;
}

const OneCodeHeaderSlideStory: React.FC<OneCodeHeaderSlideStoryProps> = ({
  slide,
}) => {
  const fps = 30;
  const Component = useMemo(() => {
    const Comp: React.FC = () => <OneCodeHeaderSlide slide={slide} fps={fps} />;
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

const meta: Meta<typeof OneCodeHeaderSlideStory> = {
  title: "x/video-manager/video-slides/OneCodeHeaderSlide",
  component: OneCodeHeaderSlideStory,
};

export default meta;
type Story = StoryObj<typeof OneCodeHeaderSlideStory>;

export const Default: Story = {
  args: {
    slide: {
      id: "one-code-header-1",
      type: "ONE_CODE_HEADER",
      startTime: 0,
      text: "npm run build",
    },
  },
};
