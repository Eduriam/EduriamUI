import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { BackgroundImage } from "./BackgroundImage";

const meta: Meta<typeof BackgroundImage> = {
  title: "x/video-manager/video-components/BackgroundImage",
  component: BackgroundImage,
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
type Story = StoryObj<typeof BackgroundImage>;

export const Default: Story = {
  args: {
    comp: {
      id: "bi1",
      type: "BACKGROUND_IMAGE",
      startTime: 0,
      url: "https://placehold.co/1920x1080/0ea5e9/white?text=Background+Image",
    },
  },
};
