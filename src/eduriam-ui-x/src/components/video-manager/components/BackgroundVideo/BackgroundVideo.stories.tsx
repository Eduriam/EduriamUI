import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { BackgroundVideo } from "./BackgroundVideo";

const meta: Meta<typeof BackgroundVideo> = {
  title: "x/video-manager/components/BackgroundVideo",
  component: BackgroundVideo,
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
type Story = StoryObj<typeof BackgroundVideo>;

export const Default: Story = {
  args: {
    comp: {
      id: "bv1",
      type: "BACKGROUND_VIDEO",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  },
};
