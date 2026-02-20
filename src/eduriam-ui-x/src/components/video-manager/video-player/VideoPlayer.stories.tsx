import type { Meta, StoryObj } from "@storybook/react";

import type { VideoDefinition } from "../video/VideoDefinition";
import { VideoPlayer } from "./VideoPlayer";

const sampleDefinition: VideoDefinition = {
  fps: 30,
  videoWidth: 1920,
  videoHeight: 1080,
  scenes: [
    {
      id: "scene-1",
      duration: 10000,
      slides: [
        {
          id: "slide-1",
          type: "CUSTOM",
          components: [
            {
              id: "bg1",
              type: "BACKGROUND_COLOR",
              startTime: 0,
              color: "#0ea5e9",
            },
            {
              id: "h1",
              type: "HEADER",
              startTime: 0,
              text: "Welcome to Eduriam",
              position: "CENTER",
            },
          ],
        },
      ],
    },
  ],
};

const multiSceneDefinition: VideoDefinition = {
  fps: 30,
  videoWidth: 1920,
  videoHeight: 1080,
  scenes: [
    {
      id: "scene-1",
      duration: 5000,
      slides: [
        {
          id: "slide-1",
          type: "CUSTOM",
          components: [
            {
              id: "bg1",
              type: "BACKGROUND_COLOR",
              startTime: 0,
              color: "#ffffff",
            },
            {
              id: "ph1",
              type: "PAGE_HEADER",
              startTime: 0,
              text: "Key Concepts",
            },
            {
              id: "ps1",
              type: "PAGE_SUBHEADER",
              startTime: 1000,
              text: "Understanding the fundamentals",
            },
          ],
        },
      ],
    },
    {
      id: "scene-2",
      duration: 15000,
      slides: [
        {
          id: "slide-2",
          type: "CUSTOM",
          components: [
            {
              id: "bg2",
              type: "BACKGROUND_COLOR",
              startTime: 0,
              color: "#e5e5e5",
            },
            {
              id: "l1",
              type: "LIST",
              startTime: 0,
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
        },
      ],
    },
  ],
};

const meta: Meta<typeof VideoPlayer> = {
  title: "x/video-manager/RemotionVideoPlayer",
  component: VideoPlayer,
};

export default meta;
type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  args: {
    videoDefinition: sampleDefinition,
  },
};

export const MultiScene: Story = {
  args: {
    videoDefinition: multiSceneDefinition,
  },
};
