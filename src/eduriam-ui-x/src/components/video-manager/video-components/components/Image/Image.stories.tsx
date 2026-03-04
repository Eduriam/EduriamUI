import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { Image } from "./Image";

const meta: Meta<typeof Image> = {
  title: "x/video-manager/video-components/Image",
  component: Image,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          aspectRatio: "1920/1080",
          position: "relative",
          overflow: "hidden",
          background: theme.palette.background.paper,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Medium: Story = {
  args: {
    comp: {
      id: "img1",
      type: "IMAGE",
      startTime: 0,
      column: "first",
      url: "https://placehold.co/600x400/0ea5e9/white?text=Eduriam",
      size: "MEDIUM",
    },
  },
};

export const Small: Story = {
  args: {
    comp: {
      id: "img2",
      type: "IMAGE",
      startTime: 0,
      column: "first",
      url: "https://placehold.co/300x200/10b981/white?text=Small",
      size: "SMALL",
    },
  },
};



