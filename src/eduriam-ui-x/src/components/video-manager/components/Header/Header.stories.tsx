import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "x/video-manager/components/Header",
  component: Header,
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
type Story = StoryObj<typeof Header>;

export const Center: Story = {
  args: {
    comp: {
      id: "h1",
      type: "HEADER",
      text: "Welcome to Eduriam",
      position: "CENTER",
    },
  },
};

export const TopLeft: Story = {
  args: {
    comp: {
      id: "h2",
      type: "HEADER",
      text: "Top Left Header",
      position: "TOP_LEFT",
    },
  },
};
