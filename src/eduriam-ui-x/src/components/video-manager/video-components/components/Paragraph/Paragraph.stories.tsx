import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { Paragraph } from "./Paragraph";

const meta: Meta<typeof Paragraph> = {
  title: "x/video-manager/video-components/Paragraph",
  component: Paragraph,
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
type Story = StoryObj<typeof Paragraph>;

export const CenterAligned: Story = {
  args: {
    comp: {
      id: "p1",
      type: "PARAGRAPH",
      startTime: 0,
      column: "first",
      text: "Remotion is a framework for creating videos programmatically using React. It allows you to write video content as React components.",
      alignment: "CENTER",
    },
  },
};

export const LeftAligned: Story = {
  args: {
    comp: {
      id: "p2",
      type: "PARAGRAPH",
      startTime: 0,
      column: "first",
      text: "This is a left-aligned paragraph demonstrating the alignment options available.",
      alignment: "LEFT",
    },
  },
};



