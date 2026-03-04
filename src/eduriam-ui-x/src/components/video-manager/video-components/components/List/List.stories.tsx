import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { List } from "./List";

const meta: Meta<typeof List> = {
  title: "x/video-manager/video-components/List",
  component: List,
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
type Story = StoryObj<typeof List>;

export const Unordered: Story = {
  args: {
    comp: {
      id: "l1",
      type: "LIST",
      startTime: 0,
      column: "first",
      title: "Key Features",
      ordered: false,
      items: [
        { id: "i1", text: "Declarative video creation" },
        { id: "i2", text: "React component model" },
        { id: "i3", text: "Programmatic rendering" },
      ],
    },
  },
};

export const Ordered: Story = {
  args: {
    comp: {
      id: "l2",
      type: "LIST",
      startTime: 0,
      column: "first",
      title: "Steps",
      ordered: true,
      items: [
        { id: "s1", text: "Install Remotion" },
        { id: "s2", text: "Create a composition" },
        { id: "s3", text: "Render the video" },
      ],
    },
  },
};



