import { Player } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";

import React, { useMemo } from "react";

import { IListSlide, ListSlide } from "./ListSlide";

interface ListSlideStoryProps {
  slide: IListSlide;
}

const ListSlideStory: React.FC<ListSlideStoryProps> = ({ slide }) => {
  const fps = 30;
  const Component = useMemo(() => {
    const Comp: React.FC = () => <ListSlide slide={slide} fps={fps} />;
    return Comp;
  }, [slide]);

  return (
    <Player
      component={Component}
      durationInFrames={180}
      fps={fps}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{ width: "100%" }}
      controls
    />
  );
};

const meta: Meta<typeof ListSlideStory> = {
  title: "x/video-manager/video-slides/ListSlide",
  component: ListSlideStory,
};

export default meta;
type Story = StoryObj<typeof ListSlideStory>;

export const Default: Story = {
  args: {
    slide: {
      id: "list-1",
      type: "LIST",
      variant: "UNORDERED",
      items: [
        { id: "item-1", text: "Understand the input problem", startTime: 0 },
        { id: "item-2", text: "Implement the first solution", startTime: 1200 },
        { id: "item-3", text: "Refine and verify behavior", startTime: 2600 },
      ],
    },
  },
};

export const Ordered: Story = {
  args: {
    slide: {
      id: "list-2",
      type: "LIST",
      variant: "ORDERED",
      items: [
        { id: "item-1", text: "Capture requirements", startTime: 0 },
        { id: "item-2", text: "Implement template mapping", startTime: 900 },
        { id: "item-3", text: "Verify story behavior", startTime: 1800 },
      ],
    },
  },
};
