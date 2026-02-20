import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { Video } from "./Video";

const meta: Meta<typeof Video> = {
  title: "x/video-manager/components/Video",
  component: Video,
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
type Story = StoryObj<typeof Video>;

const defaultComp = {
  id: "v1",
  type: "VIDEO" as const,
  url: "https://www.w3schools.com/html/mov_bbb.mp4",
  position: "CENTER" as const,
};

export const Small: Story = {
  args: {
    comp: { ...defaultComp, size: "SMALL" },
  },
};

export const Medium: Story = {
  args: {
    comp: { ...defaultComp, size: "MEDIUM" },
  },
};

export const Large: Story = {
  args: {
    comp: { ...defaultComp, size: "LARGE" },
  },
};
