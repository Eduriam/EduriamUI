import type { Meta, StoryObj } from "@storybook/react";

import { RemotionVideoPlayer } from "./RemotionVideoPlayer";
import type { VideoDefinition } from "./types/VideoDefinition";

const sampleDefinition: VideoDefinition = {
  durationInFrames: 300,
  fps: 30,
  compositionWidth: 1920,
  compositionHeight: 1080,
  title: "Sample Explanation",
  components: [
    { type: "BACKGROUND_COLOR", color: "#0ea5e9" },
    {
      id: "h1",
      type: "HEADER",
      text: "Welcome to Eduriam",
      position: "CENTER",
    },
  ],
  componentStartMs: [0],
};

const multiComponentDefinition: VideoDefinition = {
  durationInFrames: 600,
  fps: 30,
  compositionWidth: 1920,
  compositionHeight: 1080,
  title: "Multi-component scene",
  components: [
    { type: "BACKGROUND_COLOR", color: "#1e293b" },
    {
      id: "ph1",
      type: "PAGE_HEADER",
      text: "Key Concepts",
    },
    {
      id: "ps1",
      type: "PAGE_SUBHEADER",
      text: "Understanding the fundamentals",
    },
    {
      id: "l1",
      type: "LIST",
      position: "CENTER",
      title: "Topics",
      ordered: true,
      items: [
        { id: "i1", text: "Variables and Types" },
        { id: "i2", text: "Functions" },
        { id: "i3", text: "Control Flow" },
      ],
    },
  ],
  componentStartMs: [0, 1000, 3000],
};

const meta: Meta<typeof RemotionVideoPlayer> = {
  title: "x/video-manager/RemotionVideoPlayer",
  component: RemotionVideoPlayer,
};

export default meta;
type Story = StoryObj<typeof RemotionVideoPlayer>;

export const Default: Story = {
  args: {
    videoDefinition: sampleDefinition,
  },
};

export const MultiComponent: Story = {
  args: {
    videoDefinition: multiComponentDefinition,
  },
};
