import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { PageHeader } from "./PageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "x/video-manager/video-components/PageHeader",
  component: PageHeader,
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
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    comp: { id: "ph1", type: "PAGE_HEADER", startTime: 0, column: "first", text: "Chapter 1: Introduction" },
  },
};

